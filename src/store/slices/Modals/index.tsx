import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps, ListModal, DescriptionModal, ConfirmModal } from './types';

export const defaultListsModal: ListModal = {
  open: false,
  title: '',
  mediaType: 'movie',
  mediaItem: undefined
};

export const defaultDescriptionModal: DescriptionModal = {
  open: false,
  mediaType: 'movie',
  mediaItem: undefined
};

export const defaultConfirmModal: ConfirmModal = {
  open: false,
  title: '',
  description: ''
};

const initialState: StateProps = {
  ui: {
    listsModal: { ...defaultListsModal },
    descriptionModal: { ...defaultDescriptionModal },
    confirmModal: { ...defaultConfirmModal },
    isDisplayModalOpen: false,
    isSplashscreenOpen: true
  }
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleList: (state: StateProps, action: PayloadAction<ListModal>) => {
      state.ui.listsModal = action.payload;
    },
    toggleDescription: (state: StateProps, action: PayloadAction<DescriptionModal>) => {
      state.ui.descriptionModal = action.payload;
    },
    toggleConfirm: (state: StateProps, action: PayloadAction<ConfirmModal>) => {
      state.ui.confirmModal = action.payload;
    },
    toggleDisplay: (state: StateProps, action: PayloadAction<boolean>) => {
      state.ui.isDisplayModalOpen = action.payload;
    },
    toggleSplashscreen: (state: StateProps, action: PayloadAction<boolean>) => {
      state.ui.isSplashscreenOpen = action.payload;
    }
  }
});

export const { toggleList, toggleDescription, toggleConfirm, toggleDisplay, toggleSplashscreen } = modalsSlice.actions;

export default modalsSlice.reducer;
