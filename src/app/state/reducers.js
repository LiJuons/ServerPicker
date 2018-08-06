import { combineReducers } from 'redux-seamless-immutable';
import authReducer from '../../auth/reducer';
import serverReducer from '../../servers/reducer';

const SERVERS = 'SERVERS';
const AUTH = 'AUTH';

const rootReducer = combineReducers({
  [AUTH]: authReducer,
  [SERVERS]: serverReducer
});

export default rootReducer;
