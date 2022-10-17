import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import app from './App';
import modals from './Modals';
import options from './Options';
import users from './Users';

const rootReducer = combineReducers({ app, modals, options, users });

export default withReduxStateSync(rootReducer);
