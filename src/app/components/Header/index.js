import React, { Component } from 'react';
import country_list from '../../../assets/countryList';
import { RefreshButton } from '../';
import './Header.css';

class Header extends Component {

  state = {
    selectValue: '---',
    searchValue: '',
    refreshed: false
  }

  handleChangeSelect = (e) => {
    this.setState({selectValue:e.target.value});
    this.props.filterFunc(e.target.value);
  }

  handleChangeSearch = (e) => {
    this.setState({searchValue:e.target.value});
  }

  handleSearch = (e) => {
    if (e.keyCode === 13) {
      //this.props.searchFunc(this.state.searchValue);

      this.props.filterFunc(this.state.searchValue);
    }
  }

  serversRefresh = () => {
    this.props.refreshFunc();
    this.setState({selectValue: '---', searchValue: '', refreshed: true});

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
    const { selectValue, searchValue, refreshed } = this.state;

    return (
      <div className="navBar">

        <div id="fillingDiv"></div>

        <div className="navBar-item-left" >
          <input type="text"
            value={searchValue}
            autoFocus
            autofocus='true'
            placeholder="Search..."
            onChange={this.handleChangeSearch}
            onKeyUp={this.handleSearch}
            onClick={()=>{this.setState({searchValue: ''})}}
            disabled={this.props.disableFilter}
            id="searchBox"
          />
        </div>


        <div className="navBar-item-right">
          <RefreshButton
            serversRefresh={this.serversRefresh}
            reactivation={this.reactivateButton}
            refreshed={refreshed}
          />
        </div>

        {/* <div className="navBar-item-right">
          <select
            id="country"
            value={selectValue}
            onChange={this.handleChangeSelect}
            disabled={this.props.disableFilter}
          >
            {
              country_list.map(country =>
                <option key={country} value={country}>{country}</option>
              )
            }
          </select>
        </div>

        <div className="navBar-item-right" id="nb-country">Country:</div>

        <div className="navBar-item-right" id="searchBoxName">
          Search:
        </div> */}

      </div>
    );
  }
}

export default Header;
