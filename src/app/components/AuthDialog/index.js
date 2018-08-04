import React, { Component } from 'react';
import './AuthDialog.css';

class AuthDialog extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange= (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  preHandleAuth = () => {
    this.props.handleAuth(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>

        <div id="myModal" className="modal" >


          <div className="modal-content">
            <h3>Authentication</h3>

            <div className="form-control">

              <input
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleChange}
                tabIndex="1"
              />

              <input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleChange}
                tabIndex="2"
              />

              <button type="submit" name="submit" onClick={this.preHandleAuth}>Submit</button>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default AuthDialog;
