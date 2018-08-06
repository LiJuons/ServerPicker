import React, { Component } from 'react';
import country_list from '../../../assets/countryList';
import protocol_list from '../../../assets/protocolList';
import logoutIco from '../../../assets/logout.png';
import { RefreshButton } from '../';
import './Header.css';

class Header extends Component {

  state = {
    searchValue: '',
    selectCountry: '---',
    selectProtocol: '---',
    selectObfs: false,
    refreshed: false
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  filterFunction = () => {
    this.props.filterFunc(this.state, 'filter');
  }

  searchFunction = (e) => {
    if (e.keyCode === 13) {
      this.props.filterFunc(this.state, 'search');
    }
  }

  serversRefresh = () => {
    this.props.refreshFunc();
    this.setState({ selectCountry: '---', selectProtocol: '---', searchValue: '', selectObfs: false, refreshed: true });

    setTimeout(() => {
      this.setState({refreshed: false});
    }, localStorage.getItem('seconds')*1000); //disable refresh for 5 minutes
  }

  reactivateButton = () => {
    this.setState({refreshed: false});
  }

  componentDidMount() {
    if(localStorage.getItem('seconds')>5){
      this.setState({refreshed: true});
    }
  }

  render() {
    const { selectCountry, selectProtocol, selectObfs, searchValue, refreshed } = this.state;

    return (
      <div className="navBar">

        <div id="fillingDiv"></div>

        <div className="navBar-item-left" >
          <input type="text"
            value={searchValue}
            name="searchValue"
            autoFocus
            placeholder="Search..."
            onChange={this.handleChange}
            onKeyUp={this.searchFunction}
            onClick={()=>{this.setState({searchValue: ''})}}
            disabled={this.props.disableFilter}
            id="searchBox"
          />
        </div>

        <div className="navBar-item-right">
          <img src={logoutIco} alt="Logout Icon" onClick={this.props.logout} id="logoutIco" />
        </div>

        <div className="navBar-item-right">
          <RefreshButton
            serversRefresh={this.serversRefresh}
            reactivation={this.reactivateButton}
            refreshed={refreshed}
          />
        </div>

        <div className="filters-container navBar-item-right">

          <button
            type="button"
            name="button"
            id="filterButton"
            className="navBar-item-right"
            onClick={this.filterFunction}
          >
            >
          </button>

          <div className="navBar-item-right">
            <div className="radioInput">
              XOR<br/>
              <input
                type="checkbox"
                name="selectObfs"
                id="checkXOR"
                checked={selectObfs}
                onChange={this.handleChange}
                disabled={this.props.disableFilter}
              />
            </div>
          </div>

          <div className="navBar-item-right">
            Protocol
            <select
              id="country"
              name="selectProtocol"
              value={selectProtocol}
              onChange={this.handleChange}
              disabled={this.props.disableFilter || selectObfs}
            >
              {
                protocol_list.map(protocol =>
                  <option key={protocol} value={protocol}>{protocol}</option>
                )
              }
            </select>
          </div>

          <div className="navBar-item-right">
            Country
            <select
              id="country"
              name="selectCountry"
              value={selectCountry}
              onChange={this.handleChange}
              disabled={this.props.disableFilter}
            >
              {
                country_list.map(country =>
                  <option key={country} value={country}>{country}</option>
                )
              }
            </select>
          </div>

        </div>


      </div>
    );
  }
}

export default Header;
