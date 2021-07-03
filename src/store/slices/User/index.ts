import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { StateProps, Search, MediaItem, ListsModal, List, Theme } from './types';

export const defaultListsModal = {
  open: false,
  item: undefined
};

const initialState: StateProps = {
  data: {
    recentSearches: [],
    recentlyViewed: [],
    liked: [],
    lists: [
      {
        id: uuid(),
        label: 'Watchlist',
        date: moment(new Date()).toISOString(),
        results: []
      }
    ]
  },
  ui: {
    listsModal: { ...defaultListsModal },
    isDisplayModalOpen: false,
    theme: {
      // fontSize: 'base',
      color: 'blue',
      background: 'light'
    }
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (state: StateProps, action: PayloadAction<Theme>) => {
      state.ui.theme = action.payload;
    },
    setRecentSearches: (state: StateProps, action: PayloadAction<Search[]>) => {
      state.data.recentSearches = action.payload;
    },
    setRecentlyViewed: (state: StateProps, action: PayloadAction<MediaItem[]>) => {
      state.data.recentlyViewed = action.payload;
    },
    setLiked: (state: StateProps, action: PayloadAction<MediaItem[]>) => {
      state.data.liked = action.payload;
    },
    setLists: (state: StateProps, action: PayloadAction<List[]>) => {
      state.data.lists = action.payload;
    },
    toggleList: (state: StateProps, action: PayloadAction<ListsModal>) => {
      state.ui.listsModal = action.payload;
    },
    toggleDisplay: (state: StateProps, action: PayloadAction<boolean>) => {
      state.ui.isDisplayModalOpen = action.payload;
    }
  }
});

export const { setTheme, setRecentSearches, setRecentlyViewed, setLiked, setLists, toggleList, toggleDisplay } =
  userSlice.actions;

export default userSlice.reducer;
