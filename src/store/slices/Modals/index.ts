import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps, BookmarkModal, QuickViewModal, AuthenticationConfirmModal } from './types';

export const defaultBookmarkModal: BookmarkModal = {
	mediaType: 'movie',
	mediaItem: null,
	isOpen: false,
	title: ''
};

export const defaultQuickViewModal: QuickViewModal = {
	isOpen: false,
	mediaType: 'movie',
	mediaItem: null
};

export const defaultAuthenticationConfirmModal: AuthenticationConfirmModal = {
	isOpen: false,
	title: '',
	description: ''
};

const initialState: StateProps = {
	ui: {
		bookmarkModal: { ...defaultBookmarkModal },
		quickViewModal: { ...defaultQuickViewModal },
		authenticationConfirmModal: { ...defaultAuthenticationConfirmModal },
		isUserThemeModalOpen: false,
		isInternationalizationModalOpen: false,
		isSpinnerModalOpen: false
	}
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState: { ...initialState },
	reducers: {
		setBookmarkModal: (state: StateProps, action: PayloadAction<BookmarkModal>) => {
			state.ui.bookmarkModal = action.payload;
		},
		setQuickViewModal: (state: StateProps, action: PayloadAction<QuickViewModal>) => {
			state.ui.quickViewModal = action.payload;
		},
		setAuthenticationConfirmModal: (state: StateProps, action: PayloadAction<AuthenticationConfirmModal>) => {
			state.ui.authenticationConfirmModal = action.payload;
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
	setBookmarkModal,
	setQuickViewModal,
	setAuthenticationConfirmModal,
	toggleUserThemeModal,
	toggleInternationalizationModal,
	toggleSpinnerModal
} = modalsSlice.actions;

export default modalsSlice.reducer;
