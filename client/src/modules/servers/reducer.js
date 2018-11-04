import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const INITIAL_STATE_SERVERS = Immutable({
    servers: [],
    filteredServers: [],
    error: null,
    isFetching: true
});

export default function serverReducer(state = INITIAL_STATE_SERVERS, { type, payload }) {
  if (!sessionStorage.getItem("token")) {
    Immutable.set(state, 'servers', []);
  }

  switch (type) {
    case types.GET_SERVERS_REQUEST:
          return Immutable.set(state, 'isFetching', true).set('error', false);
    case types.GET_SERVERS_SUCCESS:
          return payload.shouldUpdate ?
            Immutable.set(state, 'error', false).set('isFetching', false).set('servers', payload.servers) :
            Immutable.set(state, 'error', false).set('isFetching', false);
    case types.GET_SERVERS_FAILURE:
          return Immutable.set(state, 'error', payload.error).set('isFetching', false);
    default:
          return state;
  }
};
