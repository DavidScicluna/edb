import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	StateProps,
	BookmarkModalMediaType,
	BookmarkModal,
	QuickViewModal,
	QuickViewModalMediaType,
	AuthenticationConfirmModal,
	PromptConfirmModal
} from './types';

export const defaultBookmarkModal: BookmarkModal<BookmarkModalMediaType> = {
	isOpen: false,
	mediaType: 'movie',
	mediaItem: null,
	title: ''
};

export const defaultQuickViewModal: QuickViewModal<QuickViewModalMediaType> = {
	isOpen: false,
	mediaType: 'movie',
	mediaItem: null,
	title: ''
};

export const defaultAuthenticationConfirmModal: AuthenticationConfirmModal = {
	isOpen: false,
	title: '',
	description: ''
};

export const defaultPromptConfirmModal: PromptConfirmModal = {
	isOpen: false,
	title: '',
	subtitle: '',
	onConfirm: () => undefined
};

const initialState: StateProps = {
	ui: {
		bookmarkModal: { ...defaultBookmarkModal },
		quickViewModal: { ...defaultQuickViewModal },
		authenticationConfirmModal: { ...defaultAuthenticationConfirmModal },
		promptConfirmModal: { ...defaultPromptConfirmModal },
		isUserThemeModalOpen: false,
		isInternationalizationModalOpen: false,
		isSpinnerModalOpen: false
	}
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState: { ...initialState },
	reducers: {
		setBookmarkModal: <MT extends BookmarkModalMediaType>(
			state: StateProps,
			action: PayloadAction<BookmarkModal<MT>>
		) => {
			state.ui.bookmarkModal = action.payload;
		},
		setQuickViewModal: <MT extends QuickViewModalMediaType>(
			state: StateProps,
			action: PayloadAction<QuickViewModal<MT>>
		) => {
			state.ui.quickViewModal = action.payload;
		},
		setAuthenticationConfirmModal: (state: StateProps, action: PayloadAction<AuthenticationConfirmModal>) => {
			state.ui.authenticationConfirmModal = action.payload;
		},
		setPromptConfirmModal: (state: StateProps, action: PayloadAction<PromptConfirmModal>) => {
			state.ui.promptConfirmModal = action.payload;
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
	setPromptConfirmModal,
	toggleUserThemeModal,
	toggleInternationalizationModal,
	toggleSpinnerModal
} = modalsSlice.actions;

export default modalsSlice.reducer;
