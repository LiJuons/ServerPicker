import { NAME } from './constants';

export const getServers = state => state[NAME].servers;
export const getFilteredServers = state => state[NAME].filteredServers;
export const isFetching = state => state[NAME].isFetching;
export const getError = state => state[NAME].error;
