import { combineReducers } from 'redux';

import optionsReducer from './slices/options';

const rootReducer = combineReducers({
  options: optionsReducer
  // here we will be adding reducers
});

export default rootReducer;
