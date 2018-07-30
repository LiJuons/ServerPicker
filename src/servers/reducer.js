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
    Immutable.merge(state, {servers: []});
  }

  switch (type) {
    case types.GET_SERVERS_REQUEST:
          return Immutable.merge(state, {isFetching: true});
    case types.GET_SERVERS_SUCCESS:
          return Immutable.merge(state, {error: false, servers: payload.servers, isFetching: false});
    case types.GET_SERVERS_FAILURE:
          return Immutable.merge(state, {error: payload.error, isFetching: false});
    case types.FILTER_SERVERS:
          return Immutable.merge(state, {filteredServers: payload.filteredServers, error: false, isFetching: false});
    case types.SEARCH_SERVERS:
          return searchServers(state, payload.searchValue);
    case types.CLEAR_SERVERS:
          return Immutable.merge(state, {servers: []});
    default:
          return state;
  }
};

const searchServers = (state, searchValue) => {

  let filteredServers = [];

  if (!!localStorage.getItem('servers')) {

    const servers = JSON.parse(localStorage.getItem('servers'));

    servers.forEach(server => {
      if (server.name.toUpperCase().includes(searchValue.toUpperCase())){
        filteredServers.push(server);
      }
    })

  }

  return Immutable.merge(state, {filteredServers: filteredServers, error: false, isFetching: false});
}
