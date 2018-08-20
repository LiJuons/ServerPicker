import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/state/index';
import './index.css';
import { App } from './app/containers';

alert("Naujas ServerPicker v1.2 update. Jei tai pirmas kartas, kada isijungei server picker - paspausk refresh mygtuka.")
console.log("Naujas ServerPicker v1.2 update. Jei tai pirmas kartas, kada isijungei server picker - paspausk refresh mygtuka.");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
