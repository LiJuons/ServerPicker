import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/state/index';
import { App } from './app/containers';
import './index.css';

const isIE = /*@cc_on!@*/false || !!document.documentMode;

if (!!isIE) alert("Internet Explorer does not support Server Picker. \nPlease use Mozilla Firefox or Google Chrome.");
else {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}
