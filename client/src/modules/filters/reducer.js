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
          return Immutable.set(state, 'isFiltering', true);
    case types.FILTER_SERVERS_SUCCESS:
          return Immutable.set(state, 'filteredServers', payload.filteredServers).set('isFiltering', false).set('error', false);
    case types.FILTER_SERVERS_FAILURE:
          return Immutable.set(state, 'filteredServers', []).set('isFiltering', false).set('error', payload.error);
    case types.DISPLAY_CHANGE:
          return Immutable.set(state, 'separateColumns', !state.separateColumns);
    case types.HEADER_HIDE:
          return Immutable.set(state, 'headerHide', !state.headerHide);
    default:
          return state;
  }
};
