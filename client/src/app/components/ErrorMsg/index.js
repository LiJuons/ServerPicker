import React from 'react';
import './ErrorMsg.css';

const ErrorMsg = ({message, hideError}) =>  (
    <div className="error-container" >
      <div>{message}</div>
      <div className="error-exit" onClick={hideError()}>X</div>
    </div>
);

export default ErrorMsg;
