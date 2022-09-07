import { combineReducers } from 'redux';

import app from './App';
import modals from './Modals';
import options from './Options';
import users from './Users';

const rootReducer = combineReducers({ app, modals, options, users });

export default rootReducer;
