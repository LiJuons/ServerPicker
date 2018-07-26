import React, { Component } from 'react';
import { connect } from 'react-redux';
import servers from '../../../servers';
import { ErrorMsg, ServerList, Spinner } from '../../components';
import './ServersPage.css';

class ServersPage extends Component {

  componentWillMount() {
    this.props.getServers();
  }

  render() {
    const { filteredServers, servers, isFetching, fetchError } = this.props;

    return (
      <div className={isFetching ? "page-container loading" : "page-container"}>

        <div className="emptyDiv"></div>

        {
          isFetching ? //if Fetching show spinner, else...

          <Spinner /> :

          !!fetchError ? //if error, show message, else...

          <ErrorMsg message={fetchError} /> :

          <ServerList servers={servers} filteredServers={JSON.stringify(filteredServers)} />
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
  getServers: servers.actions.getServers
}

export default connect(mapStateToProps, mapActionsToProps)(ServersPage);
