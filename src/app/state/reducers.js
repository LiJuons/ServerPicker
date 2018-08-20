import { combineReducers } from 'redux-seamless-immutable';
import authReducer from '../../modules/auth/reducer';
import serverReducer from '../../modules/servers/reducer';

const SERVERS = 'SERVERS';
const AUTH = 'AUTH';

const rootReducer = combineReducers({
  [AUTH]: authReducer,
  [SERVERS]: serverReducer
});

export default rootReducer;
