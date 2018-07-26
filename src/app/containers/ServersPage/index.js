import React, { Component } from 'react';
import { connect } from 'react-redux';
import servers from '../../../servers';
import { ServerList, Spinner } from '../../components';
import './ServersPage.css';

class ServersPage extends Component {

  refreshServers = () => {
    console.log("Server Refresh in process.");
    this.props.refreshServers();
  }

  componentWillMount() {
    this.props.getServers();
  }

  render() {
    const { filterServers, filteredServers, servers, isFetching } = this.props;
    
    return (
      <div className={isFetching ? "page-container loading" : "page-container"}>

        <div className="emptyDiv"></div>

        {
          isFetching ?
          <Spinner />
          :
          <ServerList filterFunc={filterServers} servers={servers} filteredServers={JSON.stringify(filteredServers)} />
        }

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
  refreshServers: servers.actions.apiCall,
  getServers: servers.actions.getServers,
  filterServers: servers.actions.filterServers
}

export default connect(mapStateToProps, mapActionsToProps)(ServersPage);
