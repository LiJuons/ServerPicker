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
          return Immutable.merge(state, {isLogged: true, error: '', authInProgress: false});
    case types.AUTH_FAILURE:
          return Immutable.merge(state, {isLogged: false, error: payload.error, authInProgress: false});
    default:
          return state;
  }
};
