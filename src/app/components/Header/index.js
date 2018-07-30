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
      this.props.searchFunc(this.state.searchValue);
    }
  }

  serversRefresh = () => {
    this.props.refreshFunc();
    this.setState({selectValue: '---', refreshed: true});
    setTimeout(() => {
      this.setState({refreshed: false});
    }, 300000) //disable refresh for 5 minutes
  }

  render() {
    const { selectValue, searchValue, refreshed } = this.state;

    return (
      <div className="navBar">

        <div id="fillingDiv"></div>



        <div className="navBar-item-left" id="nb-country">Country:</div>

        <div className="navBar-item-left">
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



        <div className="navBar-item-right">
          <RefreshButton serversRefresh={this.serversRefresh} refreshed={refreshed} />
        </div>



        <div className="navBar-item-right" >
          <input type="text"
            name=""
            value={searchValue}
            onChange={this.handleChangeSearch}
            onKeyUp={this.handleSearch}
            disabled={this.props.disableFilter}
            id="searchBox"
          />
        </div>

        <div className="navBar-item-right" id="searchBoxName">
          Search:
        </div>


      </div>
    );
  }
}

export default Header;
