import 'whatwg-fetch';
import * as types from './actionTypes';

export const authInit = () => ({
    type: types.AUTH_REQUEST
})

export const authSuccess = (token) => ({
    type: types.AUTH_SUCCESS,
    payload: {
      token
    }
  }
)

export const authFailure = (error) => ({
    type: types.AUTH_FAILURE,
    payload: {
      error
    }
  }
)

export const authLogout = () => ({
    type: types.AUTH_LOGOUT
})

export const authRequest = (username, password) => (dispatch) =>
  new Promise ((resolve, reject) => {
      const { token } = sessionStorage;

      dispatch(authInit());

      if (token && typeof(token) !== 'undefined') {
        dispatch(authCheck());
      } else {

        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username, password
          })
        }).then(response => {
            if (!response.ok) {
              const err = (response.status === 401) ? "Wrong username or password." : response.statusText;
              dispatch(authFailure(err));
              reject(err);
            } else return response.json();
          }).then(resp => {
            dispatch(authSuccess(resp.token));
            resolve();
        }).catch(() => {});

      }
  })

export const authCheck = () => (dispatch) => {
    const { token } = sessionStorage;

    if (!!token && typeof(token) !== 'undefined') {

      fetch('/auth', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${token}`
        }
      }).then(res => {
        dispatch(authSuccess(token));
      }).catch(() => {
        dispatch(authFailure("Unauthorized."));
      });

    }

}
