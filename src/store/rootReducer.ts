import { combineReducers } from 'redux';

import appReducer from './slices/App';
import modalsReducer from './slices/Modals';
import optionsReducer from './slices/Options';
import userReducer from './slices/User';

const rootReducer = combineReducers({
  app: appReducer,
  modals: modalsReducer,
  options: optionsReducer,
  user: userReducer
});

export default rootReducer;
