import { combineReducers } from 'redux';

import appReducer from './slices/App';
import modalsReducer from './slices/Modals';
import userReducer from './slices/User';

const rootReducer = combineReducers({
  app: appReducer,
  modals: modalsReducer,
  user: userReducer
});

export default rootReducer;
