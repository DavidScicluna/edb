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
		isInternationalizationModalOpen: false,
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
		toggleInternationalizationModal: (state: StateProps, action: PayloadAction<boolean>) => {
			state.ui.isInternationalizationModalOpen = action.payload;
		},
		toggleSpinnerModal: (state: StateProps, action: PayloadAction<boolean>) => {
			state.ui.isSpinnerModalOpen = action.payload;
		}
	}
});

export const {
	setListsModal,
	setQuickViewModal,
	toggleUserThemeModal,
	toggleInternationalizationModal,
	toggleSpinnerModal
} = modalsSlice.actions;

export default modalsSlice.reducer;
