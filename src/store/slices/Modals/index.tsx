import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Button from '../../../components/Clickable/Button';
import { StateProps, ListModal, DescriptionModal, ConfirmModal, QuickViewModal } from './types';

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
  title: 'Lorem ipsum',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  submitButton: (
    <Button isDisabled size='sm'>
      Close
    </Button>
  )
};

export const defaultQuickViewModal: QuickViewModal = {
  open: false,
  mediaType: 'movie',
  mediaItem: undefined
};

const initialState: StateProps = {
  ui: {
    listsModal: { ...defaultListsModal },
    descriptionModal: { ...defaultDescriptionModal },
    confirmModal: { ...defaultConfirmModal },
    quickViewModal: { ...defaultQuickViewModal },
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
    toggleQuickView: (state: StateProps, action: PayloadAction<QuickViewModal>) => {
      state.ui.quickViewModal = action.payload;
    },
    toggleDisplay: (state: StateProps, action: PayloadAction<boolean>) => {
      state.ui.isDisplayModalOpen = action.payload;
    },
    toggleSplashscreen: (state: StateProps, action: PayloadAction<boolean>) => {
      state.ui.isSplashscreenOpen = action.payload;
    }
  }
});

export const { toggleList, toggleDescription, toggleConfirm, toggleQuickView, toggleDisplay, toggleSplashscreen } =
  modalsSlice.actions;

export default modalsSlice.reducer;
