import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { stateTransformer } from 'redux-seamless-immutable';
import { createLogger } from 'redux-logger';
const logger = createLogger({
  stateTransformer: stateTransformer
});

const midlewares = [thunk, logger];

//const midlewares = [thunk];

export default applyMiddleware(...midlewares);
