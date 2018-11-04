import { combineReducers } from 'redux-seamless-immutable';
import { auth, servers, filters } from '../../modules';

const rootReducer = combineReducers({
  [auth.constants.NAME]: auth.reducers,
  [servers.constants.NAME]: servers.reducers,
  [filters.constants.NAME]: filters.reducers
});

export default rootReducer;
