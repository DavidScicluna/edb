import { combineReducers } from 'redux';

import appReducer from './slices/app';
import optionsReducer from './slices/options';

const rootReducer = combineReducers({
  app: appReducer,
  options: optionsReducer
  // here we will be adding reducers
});

export default rootReducer;
