import React, { Component } from 'react';
import './ErrorMsg.css';

class ErrorMsg extends Component {
  state = {
    showError: true
  }

  componentWillReceiveProps() {
    this.setState({ showError: true });
  }

  toggleErrorBox = () => {
    this.setState({ showError: false });
  }

  render() {
    const { showError } = this.state;
    const { message } = this.props;

    return (
      <div className={ showError ? "error-container" : "error-hidden" } >
        <div>{message}</div>
        <div className="error-exit" onClick={this.toggleErrorBox}>X</div>
      </div>
    );
  }
}

export default ErrorMsg;
