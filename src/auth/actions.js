import * as types from './actionTypes';

export const authRequest = () => ({
    type: types.AUTH_REQUEST
  }
)

export const authSuccess = () => ({
    type: types.AUTH_SUCCESS
  }
)

export const authFailure = (error) => ({
    type: types.AUTH_FAILURE,
    payload: {
      error
    }
  }
)
