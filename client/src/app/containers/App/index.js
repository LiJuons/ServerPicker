import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { auth, servers, filters } from '../../../modules';
import { ServersPage, Login } from '../';
import { Header } from '../../components';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    const {
      refreshServers, filterServers, isFetching,
      displayChange, headerHide, filterNewServers,
      isLogged, authLogout
    } = this.props;

    return (
      <div className="App">

        {
          (isLogged && !!sessionStorage.token && sessionStorage.token !== 'undefined')  &&
              <Header
                filterFunc={filterServers}
                refreshFunc={refreshServers}
                disableFilter={isFetching}
                displayChange={displayChange}
                headerHide={headerHide}
                filterNewServers={filterNewServers}
                logout={authLogout}
              />
        }

        <Switch>
          <Route exact path="/" component={ServersPage} />
          <Route exact path="/login" component={Login} />
          <Route path="*" render={() => (<Redirect to="/" />)} />
        </Switch>

      </div>
    );
  }
}

const mapStateToProps = state => ({
    isLogged: auth.selectors.isLogged(state),
    isFetching: servers.selectors.isFetching(state),
    error: servers.selectors.getError(state)
});

const mapActionsToProps = {
  authCheck: auth.actions.authCheck,
  authLogout: auth.actions.authLogout,
  refreshServers: servers.actions.preApiCall,
  filterServers: filters.actions.filterServers,
  displayChange: filters.actions.displayChange,
  filterNewServers: filters.actions.filterNewServers,
  headerHide: filters.actions.headerHide
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
