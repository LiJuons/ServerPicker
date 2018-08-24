import { combineReducers } from 'redux-seamless-immutable';
import authReducer from '../../modules/auth/reducer';
import serverReducer from '../../modules/servers/reducer';
import filterReducer from '../../modules/filters/reducer';

const AUTH = 'AUTH';
const SERVERS = 'SERVERS';
const FILTERS = 'FILTERS';

const rootReducer = combineReducers({
  [AUTH]: authReducer,
  [SERVERS]: serverReducer,
  [FILTERS]: filterReducer
});

export default rootReducer;
