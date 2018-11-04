import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner, ErrorMsg } from '../../components';
import { auth } from '../../../modules';
import './Login.css';

export class Login extends Component {

  state = {
    username: '',
    password: '',
    error: ''
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLogged && !!sessionStorage.token && sessionStorage.token !== 'undefined') {
      this.props.history.replace("/");
    }
  }

  encodeHTML = (s) => (s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'));

  handleChange= (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  handleAuth = () => {
    const { username, password } = this.state;
    this.encodeHTML(username);
    this.encodeHTML(password);

    this.props.authRequest(username, password)
      .catch((error) => {
        this.setState({ error })
      });
  }

  hideError = () => {this.setState({error: ''});}

  render() {
    const { authProccessing } = this.props;
    const { error } = this.state;

    return (
      <div>

        {
          !!error && <ErrorMsg message={error} hideError={() => this.hideError}/>
        }

        <div id="myModal" className="modal">


          <div className="modal-content">
            <h2 style={{ marginLeft: 8 }}>Authentication</h2>

              <div className="form-control">

                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  placeholder="Username"
                  onChange={this.handleChange}
                  onKeyPress={(e)=>{if ((e.keyCode || e.which) === 13) {
                      this.handleAuth()
                    }}}
                  tabIndex="1"
                />

                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handleChange}
                  onKeyPress={(e)=>{if ((e.keyCode || e.which) === 13) {
                      this.handleAuth()
                    }}}
                  tabIndex="2"
                />

                <button type="submit" name="submit" onClick={this.handleAuth} id="submitBtn" >
                  { authProccessing ? <Spinner type={1} style={{ left: 80 }} /> : "Login" }
                </button>

              </div>

          </div>

        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
    authProccessing: auth.selectors.getAuthProcStatus(state),
    isLogged: auth.selectors.isLogged(state)
});

const mapActionsToProps = {
  authRequest: auth.actions.authRequest
}

export default connect(mapStateToProps, mapActionsToProps)(Login);
