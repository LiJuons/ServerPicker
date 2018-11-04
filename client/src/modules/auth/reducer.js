import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const INITIAL_STATE_SERVERS = Immutable({
  isLogged: false,
  authInProgress: false,
  error: ''
});

export default function authReducer(state = INITIAL_STATE_SERVERS, { type, payload }) {
  switch (type) {
    case types.AUTH_REQUEST:
          return Immutable.set(state, 'authInProgress', true);
    case types.AUTH_SUCCESS:
          sessionStorage.setItem('token', payload.token);
          return Immutable.set(state, 'isLogged', true).set('authInProgress', false).set('error', '');
    case types.AUTH_FAILURE:
          return Immutable.set(state, 'isLogged', false).set('authInProgress', false).set('error', payload.error);
    case types.AUTH_LOGOUT:
          sessionStorage.removeItem('token');
          return Immutable.set(state, 'isLogged', false);
    default:
          return state;
  }
};
