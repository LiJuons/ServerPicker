import React, { Component } from 'react';
import { country_list, protocol_list } from '../../../assets';
import { RefreshButton, SvgIcon, TimeInfoBox } from '../';
import './Header.css';

class Header extends Component {
  isCancelled = false;
  refreshTimeout = null;
  state = {
    searchValue: '',
    selectCountry: '---',
    selectProtocol: '---',
    selectObfs: false,
    refreshed: false,
    showHeader: true,
    showSettings: false,
    showTimeInfo: false,
    separateColumns: 'true',
    timePiece: 31
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (!this.isCancelled) {
      this.setState({
        [name]: value,
        showTimeInfo: false
      });
    }
  }

  handleDisplayChange = (event) => {
    const value = event.target.value;
    const name = 'separateColumns';

    if (!this.isCancelled) {
      this.setState({
        [name]: value
      }, () => {
        this.props.displayChange();
      });
    }
  }

  timeFilter = () => {
    const { timePiece } = this.state;

    if (timePiece===31 && !this.isCancelled) {
      this.setState({showTimeInfo: true}, () => {
        setTimeout(() => {
          this.setState({showTimeInfo: false});
        }, 10000);
      });
    }

    this.props.filterNewServers(timePiece, this.props.servers);
  }

  filterFunction = () => {
    this.props.filterFunc(this.state, this.props.servers, 'filter');
  }

  searchFunction = (e) => {
    if (e.keyCode === 13) {
      this.props.filterFunc(this.state, this.props.servers, 'search');
    }
  }

  serversRefresh = () => {
    this.props.refreshFunc();
    this.setState({
      selectCountry: '---',
      selectProtocol: '---',
      searchValue: '',
      selectObfs: false,
      refreshed: true
    });

    if (!this.isCancelled) {

      this.refreshTimeout = setTimeout(() => {
        this.setState({refreshed: false});
      }, localStorage.getItem('seconds')*1000); //disable refresh for 5 minutes
    }
  }

  reactivateButton = () => {
    if (!this.isCancelled) this.setState({refreshed: false});
  }

  componentDidMount() {
    if(localStorage.getItem('seconds')>5 && !this.isCancelled){
      this.setState({refreshed: true});
    }
  }

  componentWillUnmount() {
    this.isCancelled = true;
    clearTimeout(this.refreshTimeout);
  }

  render() {
    const {
      selectCountry,
      selectProtocol,
      selectObfs,
      searchValue,
      refreshed,
      showHeader,
      showSettings,
      separateColumns,
      timePiece,
      showTimeInfo
    } = this.state;

    return (
      <div>

        <TimeInfoBox days={timePiece} shouldDisplay={ showTimeInfo } />

        <div id="closeBtnDiv" onClick={() => {this.setState({ showHeader: !showHeader }); this.props.headerHide();}}>
          <SvgIcon iconType="closeBtn" toggle={showHeader} />
        </div>

        <div id="fillingDiv" style={ showHeader ? { display: "block" } : { display: "none" } }></div>

        <div className={ showHeader ? "navBar" : "navBar-hidden" } >

          <div className="navBar-item-left" id="settingsBtnDiv"  onClick={() => {this.setState({ showSettings: !showSettings })}}>
            <div style={ showSettings ? { display: 'block' } : { display: 'none' } }>
              <SvgIcon iconType="filterBackBtn" />
            </div>
            <div style={ showSettings ? { display: 'none' } : { display: 'block' } }>
              <SvgIcon iconType="settingsBtn" />
            </div>
          </div>

          <div className="navBar-item-left" id="clockBtnDiv"  onClick={() => {this.timeFilter()}}>
            <SvgIcon iconType="clockBtn" />
          </div>

          <div className="navBar-item-right" onClick={this.props.logout}>
            <SvgIcon iconType="logoutBtn" />
          </div>

          <div className="navBar-item-right">
            <RefreshButton
              serversRefresh={this.serversRefresh}
              reactivation={this.reactivateButton}
              refreshed={refreshed}
              timeout={1800}//How long should it restrict the refresh
            />
          </div>

          <div className="headerFilters" style={ showSettings ? { display: 'none' } : { display: 'block' } }>
            <div className="navBar-item-left">
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
              <div id="searchBtn" onClick={() => {this.props.filterFunc(this.state, 'search')}}>
                <SvgIcon iconType="searchBtn" />
              </div>
            </div>

            <div className="filters-container navBar-item-right">

              <div className="navBar-item-right" onClick={this.filterFunction}>
                <SvgIcon iconType="filterBtn" />
              </div>

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
                  id="protocol"
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

          <div className="headerSettings" style={ !showSettings ? { display: 'none' } : { display: 'block' } }>

            <div className="navBar-settings-left">
              <div className="settingTitle">Display:</div>
              <div className="navBar-settings-display-options">
                <input
                  type="radio"
                  value={'true'}
                  checked={separateColumns === 'true'}
                  onChange={this.handleDisplayChange}
                /> Normal <br/>
                <input
                  type="radio"
                  value={'false'}
                  checked={separateColumns === 'false'}
                  onChange={this.handleDisplayChange}
                /> Server name + IP address
              </div>
            </div>

            <div className="navBar-settings-right">
              <div className="settingTitle">Time Filter:</div>
              <div>
                <input
                  type="range"
                  name="timePiece"
                  id="timepiece"
                  min="0" max="31" step="1"
                  value={timePiece}
                  onChange={this.handleChange}
                />
                <div id="timepiece-value">Days: <i style={{ textDecoration: 'underline' }}>{timePiece}</i></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default Header;
