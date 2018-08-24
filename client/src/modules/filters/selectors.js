import { NAME } from './constants';

export const getFilteredServers = state => state[NAME].filteredServers;
export const isFiltering = state => state[NAME].isFiltering;
export const getError = state => state[NAME].error;
export const displaySeparate = state => state[NAME].separateColumns;
export const headerHide = state => state[NAME].headerHide;
