import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/state/index';
import { App } from './app/containers';
import './index.css';

// Checks if one of these browsers is used
const isChrome = !!window.chrome && !!window.chrome.webstore;
const isFirefox = typeof InstallTrigger !== 'undefined';

if (!isChrome && !isFirefox) {
  alert("ServerPicker is currently supported only on \nMozilla Firefox and Google Chrome internet browsers.");
} else {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}
