import { combineReducers } from 'redux';

import appReducer from './slices/App';
import modalsReducer from './slices/Modals';
import optionsReducer from './slices/Options';
import usersReducer from './slices/Users';

const rootReducer = combineReducers({
	app: appReducer,
	modals: modalsReducer,
	options: optionsReducer,
	users: usersReducer
});

export default rootReducer;
