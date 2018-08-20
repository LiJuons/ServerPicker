import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import servers from '../../../modules/servers';
import auth from '../../../modules/auth';
import { ServersPage } from '../';
import { Header, AuthDialog } from '../../components';
import fire from '../../../config/firebase';
import './App.css';

class App extends Component {
  state = {
    user: null,
    showDialog: false,
    posScroll: 0
  }

  componentDidMount() {
    this.authListener();
  }

  //############################### AUTHENTIFICATION FUNCTIONS #############################################
  //########################################################################################################
  authListener = () => {
    if (!localStorage.getItem('user')) {
      this.setState({ showDialog: true });
    }

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  handleAuth = (username, password) => {
    this.props.authRequest();

    fire.auth().signInWithEmailAndPassword(username, password)
      .then((response)=>{
        this.setState({ showDialog: false }, ()=> {this.props.authSuccess()});
      })
      .catch((error) => {
        alert(error);
        this.props.authFailure();
      });
  }

  openModal = () => {
    this.setState({ showDialog: true });
  }

  closeModal = () => {
    this.setState({ showDialog: false });
  }

  logout = () => {
    fire.auth().signOut();
    localStorage.removeItem('user');
  }
  //########################################################################################################
  //########################################################################################################

  render() {
    const { refreshServers, filterServers, isFetching, searchServers, authProcStatus } = this.props;

    return (
      <div className="App">


        {
          this.state.user

          ? <div>
              <Header
                filterFunc={filterServers}
                refreshFunc={refreshServers}
                searchFunc={searchServers}
                disableFilter={isFetching}
                logout={this.logout}
              />

              <Switch>
                <Route exact path="/" component={ServersPage} />
                <Route path="*" render={() => (<Redirect to="/" />)} />
              </Switch>
            </div>

          : <AuthDialog
              showDialog={this.state.showDialog}
              logout={this.logout}
              openModal={this.openModal}
              closeModal={this.closeModal}
              handleAuth={this.handleAuth}
              authProcStatus={authProcStatus}
            />
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({
    isFetching: servers.selectors.isFetching(state),
    servers: servers.selectors.getServers(state),
    filteredServers: servers.selectors.getFilteredServers(state),
    error: servers.selectors.getError(state),
    authProcStatus: auth.selectors.getAuthProcStatus(state),
});

const mapActionsToProps = {
  filterServers: servers.actions.filterServers,
  refreshServers: servers.actions.apiCall,
  getServers: servers.actions.getServers,
  searchServers: servers.actions.searchServers,

  authRequest: auth.actions.authRequest,
  authSuccess: auth.actions.authSuccess,
  authFailure: auth.actions.authFailure
}

export default connect(mapStateToProps, mapActionsToProps)(App);
