import { combineReducers } from 'redux-seamless-immutable';
import serverReducer from '../../servers/reducer';

const SERVERS = 'SERVERS';

const rootReducer = combineReducers({
  [SERVERS]: serverReducer
});

export default rootReducer;
