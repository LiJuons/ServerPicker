import $ from "jquery";
import * as types from './actionTypes';

export const authInit = () => ({
    type: types.AUTH_REQUEST
})

export const authConfirm = () => ({
    type: types.AUTH_CONFIRM
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

export const authRequest = (username, password) => (dispatch) => {
      const { token } = sessionStorage;

      dispatch(authInit());

      if (token && typeof(token) !== 'undefined') {
        dispatch(authCheck());
      } else {

        $.ajax({
            type: 'POST',
            url: '/login',
            headers: {
              contentType: 'application/x-www-form-urlencoded'
            },
            data: {
              username,
              password
            }
        })
        .done(res => {
          dispatch(authSuccess(res.token));
        })
        .fail(err => {
          dispatch(authFailure(err.statusText));
        });

      }
}

export const authCheck = () => (dispatch) => {
    const { token } = sessionStorage;

    if (!!token && typeof(token) !== 'undefined') {

      $.ajax({
          type: 'GET',
          url: '/auth',
          headers: {
            Accept: 'application/json',
            Authorization: `JWT ${token}`
          }
      })
      .done(res => {
        dispatch(authConfirm());
      })
      .fail(err => {
        dispatch(authFailure(err.statusText));
      });

    }

}
