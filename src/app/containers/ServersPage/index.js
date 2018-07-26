import React, { Component } from 'react';
import { connect } from 'react-redux';
import servers from '../../../servers';
import { ErrorMsg, ServerList, Spinner } from '../../components';
import './ServersPage.css';

class ServersPage extends Component {

  refreshServers = () => {
    this.props.refreshServers();
  }

  componentWillMount() {
    this.props.getServers();
  }

  render() {
    const { filterServers, filteredServers, servers, isFetching, fetchError } = this.props;

    return (
      <div className={isFetching ? "page-container loading" : "page-container"}>

        <div className="emptyDiv"></div>

        {
          isFetching ? //if Fetching show spinner, else...

          <Spinner /> :

          !!fetchError ? //if error, show message, else...

          <ErrorMsg message={fetchError} /> :

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
    fetchError: servers.selectors.getError(state)
});

const mapActionsToProps = {
  refreshServers: servers.actions.apiCall,
  getServers: servers.actions.getServers,
  filterServers: servers.actions.filterServers
}

export default connect(mapStateToProps, mapActionsToProps)(ServersPage);
