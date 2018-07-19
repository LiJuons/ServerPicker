import React, { Component } from 'react';
import { connect } from 'react-redux';
import servers from '../../../servers';
import country_list from '../../../assets/countryList';
import { ServerList } from '../../components';
import './ServersPage.css';

class ServersPage extends Component {

  componentWillMount() {
    this.props.getServers();
  }

  render() {
    const { filterServers, filteredServers, servers, isFetching, error } = this.props;

    return (
      <div className="page-container">

        <h1>Server List</h1>

        <ServerList filterFunc={filterServers} servers={servers} filteredServers={JSON.stringify(filteredServers)} />

      </div>
    );
  }
}

const mapStateToProps = state => ({
    isFetching: servers.selectors.isFetching(state),
    servers: servers.selectors.getServers(state),
    filteredServers: servers.selectors.getFilteredServers(state),
    error: servers.selectors.getError(state)
});

const mapActionsToProps = {
  getServers: servers.actions.getServers,
  filterServers: servers.actions.filterServers
}

export default connect(mapStateToProps, mapActionsToProps)(ServersPage);
