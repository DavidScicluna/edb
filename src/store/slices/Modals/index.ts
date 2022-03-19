import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps, ListModal, QuickViewModal } from './types';

export const defaultListsModal: ListModal = {
	open: false,
	title: '',
	mediaType: 'movie',
	mediaItem: undefined
};

export const defaultQuickViewModal: QuickViewModal = {
	open: false,
	mediaType: 'movie',
	mediaItem: undefined
};

const initialState: StateProps = {
	ui: {
		listsModal: { ...defaultListsModal },
		quickViewModal: { ...defaultQuickViewModal },
		isDisplayModalOpen: false,
		isUserSwitcherModalOpen: false,
		isSplashscreenOpen: true
	}
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		setList: (state: StateProps, action: PayloadAction<ListModal>) => {
			state.ui.listsModal = action.payload;
		},
		setQuickView: (state: StateProps, action: PayloadAction<QuickViewModal>) => {
			state.ui.quickViewModal = action.payload;
		},
		toggleDisplay: (state: StateProps, action: PayloadAction<boolean>) => {
			state.ui.isDisplayModalOpen = action.payload;
		},
		toggleUserSwitcher: (state: StateProps, action: PayloadAction<boolean>) => {
			state.ui.isUserSwitcherModalOpen = action.payload;
		},
		toggleSplashscreen: (state: StateProps, action: PayloadAction<boolean>) => {
			state.ui.isSplashscreenOpen = action.payload;
		}
	}
});

export const { setList, setQuickView, toggleDisplay, toggleUserSwitcher, toggleSplashscreen } = modalsSlice.actions;

export default modalsSlice.reducer;
