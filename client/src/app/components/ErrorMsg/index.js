import React, { Component } from 'react';
import './ErrorMsg.css';

class ErrorMsg extends Component {
  state = {
    showError: true
  }

  componentWillReceiveProps() {
    this.setState({ showError: true });
  }

  render() {
    const { showError } = this.state;
    const { message } = this.props;

    return (
      <div className={ showError ? "error-container" : "error-hidden" } >
        <div>{message}</div>
        <div className="error-exit" onClick={ () => this.setState({ showError: false }) }>X</div>
      </div>
    );
  }
}

export default ErrorMsg;
