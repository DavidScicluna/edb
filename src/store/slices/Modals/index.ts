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
		toggleDisplay: (state: StateProps) => {
			state.ui.isDisplayModalOpen = !state.ui.isDisplayModalOpen;
		},
		toggleUserSwitcher: (state: StateProps) => {
			state.ui.isUserSwitcherModalOpen = !state.ui.isUserSwitcherModalOpen;
		},
		toggleSplashscreen: (state: StateProps) => {
			state.ui.isSplashscreenOpen = !state.ui.isSplashscreenOpen;
		}
	}
});

export const { setList, setQuickView, toggleDisplay, toggleUserSwitcher, toggleSplashscreen } = modalsSlice.actions;

export default modalsSlice.reducer;
