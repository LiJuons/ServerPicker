import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const INITIAL_STATE_SERVERS = Immutable({
    filteredServers: [],
    error: null,
    isFiltering: false,
    separateColumns: true,
    headerHide: false
});

export default function filterReducer(state = INITIAL_STATE_SERVERS, { type, payload }) {
  switch (type) {
    case types.FILTER_SERVERS_REQUEST:
          return Immutable.merge(state, {isFiltering: true});
    case types.FILTER_SERVERS_SUCCESS:
          return Immutable.merge(state, {filteredServers: payload.filteredServers, error: false, isFiltering: false});
    case types.FILTER_SERVERS_FAILURE:
          return Immutable.merge(state, {filteredServers: [], error: payload.error, isFiltering: false});
    case types.DISPLAY_CHANGE:
          return Immutable.merge(state, {separateColumns: !state.separateColumns});
    case types.HEADER_HIDE:
          return Immutable.merge(state, {headerHide: !state.headerHide});
    default:
          return state;
  }
};
