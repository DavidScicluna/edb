import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps, ListModal, QuickViewModal } from './types';

export const defaultListsModal: ListModal = {
	isOpen: false,
	title: '',
	mediaType: 'movie',
	mediaItem: null
};

export const defaultQuickViewModal: QuickViewModal = {
	isOpen: false,
	mediaType: 'movie',
	mediaItem: null
};

const initialState: StateProps = {
	ui: {
		listsModal: { ...defaultListsModal },
		quickViewModal: { ...defaultQuickViewModal },
		isUserThemeModalOpen: false,
		isSpinnerModalOpen: false
	}
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		setListsModal: (state: StateProps, action: PayloadAction<ListModal>) => {
			state.ui.listsModal = action.payload;
		},
		setQuickViewModal: (state: StateProps, action: PayloadAction<QuickViewModal>) => {
			state.ui.quickViewModal = action.payload;
		},
		toggleUserThemeModal: (state: StateProps, action: PayloadAction<boolean>) => {
			state.ui.isUserThemeModalOpen = action.payload;
		},
		toggleSpinnerModal: (state: StateProps, action: PayloadAction<boolean>) => {
			state.ui.isSpinnerModalOpen = action.payload;
		}
	}
});

export const { setListsModal, setQuickViewModal, toggleUserThemeModal, toggleSpinnerModal } = modalsSlice.actions;

export default modalsSlice.reducer;
