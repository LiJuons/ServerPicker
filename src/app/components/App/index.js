import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ServersPage } from '../../containers';
import { Header } from '../';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Header />

        <Switch>
          <Route exact path="/" component={ServersPage} />
          <Route path="*" render={() => (<Redirect to="/" />)} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
