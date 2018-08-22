import React, { Component } from 'react';
import { connect } from 'react-redux';
import servers from '../../../modules/servers';
import filters from '../../../modules/filters';
import { ErrorMsg, ServerList, Spinner } from '../../components';
import './ServersPage.css';

class ServersPage extends Component {

  componentWillMount() {
    this.props.getServers();
  }

  render() {
    const { filteredServers, servers, isFetching, fetchError, isFiltering, filterError, displaySeparate, headerHide } = this.props;

    return (
      <div className={(isFetching || isFiltering) ? "page-container loading" : "page-container"}>

        <div className={ headerHide ? "hideBlock" : "showBlock" }></div>

        {
          (isFetching || isFiltering) //if Fetching show spinner, else...

          ? <Spinner />

          : (!!fetchError || !!filterError) //if error, show message, else...

          ? <ErrorMsg message={!!fetchError ? fetchError : filterError} />

          : <ServerList servers={servers} filteredServers={JSON.stringify(filteredServers)} displaySeparate={displaySeparate} />
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({
    isFetching: servers.selectors.isFetching(state),
    servers: servers.selectors.getServers(state),
    fetchError: servers.selectors.getError(state),

    isFiltering: filters.selectors.isFiltering(state),
    filteredServers: filters.selectors.getFilteredServers(state),
    filterError: filters.selectors.getError(state),
    displaySeparate: filters.selectors.displaySeparate(state),
    headerHide: filters.selectors.headerHide(state)
});

const mapActionsToProps = {
  getServers: servers.actions.getServers
}

export default connect(mapStateToProps, mapActionsToProps)(ServersPage);
