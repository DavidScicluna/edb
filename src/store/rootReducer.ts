import { combineReducers } from 'redux';

import appReducer from './slices/App';
import optionsReducer from './slices/Options';
import userReducer from './slices/User';

const rootReducer = combineReducers({
  app: appReducer,
  options: optionsReducer,
  user: userReducer
});

export default rootReducer;
