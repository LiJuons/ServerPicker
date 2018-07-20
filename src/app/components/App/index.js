import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import servers from '../../../servers';
import { ServersPage } from '../../containers';
import { Header } from '../';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Header
          refreshFunc={this.props.refreshServers}
          filterFunc={this.props.filterServers}
        />

        <Switch>
          <Route exact path="/" component={ServersPage} />
          <Route path="*" render={() => (<Redirect to="/" />)} />
        </Switch>

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

export default connect(mapStateToProps, mapActionsToProps)(App);
