import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

import slices from './slices';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['modals', 'options']
};

const persistedReducer = persistReducer(persistConfig, slices);

const store = configureStore({
	reducer: persistedReducer,
	devTools: import.meta.env.NODE_ENV !== 'production',
	middleware: [createStateSyncMiddleware(persistConfig)]
});

initStateWithPrevTab(store);

export default store;
