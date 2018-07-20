import React, { Component } from 'react';
import country_list from '../../../assets/countryList';
import { RefreshButton } from '../';
import './Header.css';

class Header extends Component {

  state = {
    selectValue: '---',
    refreshed: false
  }

  handleChange = (e) => {
    this.setState({selectValue:e.target.value});
    console.log(e.target.value);
    this.props.filterFunc(e.target.value);
  }

  serversRefresh = () => {
    this.props.refreshFunc();
    this.setState({selectValue: '---', refreshed: true});
    setTimeout(() => {
      this.setState({refreshed: false});
    }, 300000) //disable refresh for 5 minutes
  }

  render() {
    const { selectValue, refreshed } = this.state;

    return (
      <div className="navBar">

        <div className="navBar-item-left" id="nb-country">Country:</div>

        <div className="navBar-item-left">
          <select
            id="country"
            value={selectValue}
            onChange={this.handleChange}
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

      </div>
    );
  }
}

export default Header;
