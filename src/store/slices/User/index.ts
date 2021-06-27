import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { StateProps, Search, MediaItem, ListsModal, List } from './types';

export const defaultListsModal = {
  open: false,
  item: undefined
};

const initialState: StateProps = {
  data: {
    recentSearches: [],
    recentlyViewed: [],
    liked: [],
    listsModal: { ...defaultListsModal },
    lists: [
      {
        id: uuid(),
        label: 'Watchlist',
        date: moment(new Date()).toISOString(),
        results: []
      }
    ]
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
      state.data.listsModal = action.payload;
    }
  }
});

export const { setRecentSearches, setRecentlyViewed, setLiked, setLists, toggleList } = userSlice.actions;

export default userSlice.reducer;
