import $ from "jquery";
import * as types from './actionTypes';

const saved_token = sessionStorage.getItem('token');

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
      dispatch(authInit());

      if (saved_token !== 'undefined' && saved_token) {

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

    if (!!saved_token && saved_token !== 'undefined') {

      $.ajax({
          type: 'GET',
          url: '/auth',
          headers: {
            Accept: 'application/json',
            Authorization: `JWT ${saved_token}`
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
