import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import slices from './slices';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['app', 'users'],
	blacklist: ['modals', 'options']
};

const persistedReducer = persistReducer(persistConfig, slices);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production'
});

export default store;
