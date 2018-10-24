import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, servers, filters } from '../../../modules';
import { ServerList, Spinner } from '../../components';
import './ServersPage.css';

export class ServersPage extends Component {

  componentWillMount() {
    if (this.checkAccess()) {
      this.props.getServers();
    }
  }

  componentDidUpdate() {
    this.checkAccess();
  }

  checkAccess = () => {
    const { isLogged, history } = this.props;

    if (!isLogged || !sessionStorage.token || sessionStorage.token === 'undefined') {
      history.replace("/login");
      return false;
    }
    else return true;
  }

  render() {
    const {
      filteredServers, servers, isFetching,
      fetchError, isFiltering, filterError,
      displaySeparate, headerHide, setFilteredServers
    } = this.props;

    return (
      <div className={
        (isFetching || isFiltering) ? "page-container loading" : "page-container"
      }>

        <div className={ headerHide ? "hideBlock" : "showBlock" }></div>

        {
          (isFetching || isFiltering) //if Fetching show spinner, else...

          ? <Spinner />

          : (!!fetchError || !!filterError) //if error, show message, else...

          ? <div className="error-div">{!!fetchError ? fetchError : filterError}</div>

          : <ServerList
              servers={servers}
              filteredServers={JSON.stringify(filteredServers)}
              setServers={setFilteredServers}
              displaySeparate={displaySeparate}
            />
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({
    isLogged: auth.selectors.isLogged(state),

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
  getServers: servers.actions.getServers,
  setFilteredServers: filters.actions.filterServersSuccess
}

export default connect(mapStateToProps, mapActionsToProps)(ServersPage);
