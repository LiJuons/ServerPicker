import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const INITIAL_STATE_SERVERS = Immutable({
  isLogged: false,
  authInProgress: false,
  error: ''
});

export default function authReducer (state = INITIAL_STATE_SERVERS, { type, payload }) {
  switch (type) {
    case types.AUTH_REQUEST:
          return Immutable.merge(state, {authInProgress: true});
    case types.AUTH_SUCCESS:
          sessionStorage.setItem('token', payload.token);
          return Immutable.merge(state, {isLogged: true, error: '', authInProgress: false});
    case types.AUTH_FAILURE:
          return Immutable.merge(state, {isLogged: false, error: payload.error, authInProgress: false});
    case types.AUTH_CONFIRM:
          return Immutable.merge(state, {isLogged: true, error: '', authInProgress: false});
    case types.AUTH_LOGOUT:
          sessionStorage.removeItem('token');
          return Immutable.merge(state, {isLogged: false});
    default:
          return state;
  }
};
