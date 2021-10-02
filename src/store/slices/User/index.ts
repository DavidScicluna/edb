import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { StateProps, Search, MediaItems, List, UserReview, Theme } from './types';

const initialState: StateProps = {
  data: {
    recentSearches: [],
    recentlyViewed: {
      movies: [],
      tv: [],
      people: []
    },
    liked: {
      movies: [],
      tv: [],
      people: []
    },
    lists: [
      {
        id: uuid(),
        label: 'Watchlist',
        description:
          "A collection of movies and tv shows that I'm looking forward to watching and hopefully re-watch 🥳 🤓",
        date: moment(new Date()).toISOString(),
        results: {
          movies: [],
          tv: []
        }
      }
    ],
    reviews: []
  },
  ui: {
    theme: {
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
    setRecentlyViewed: (state: StateProps, action: PayloadAction<MediaItems>) => {
      state.data.recentlyViewed = action.payload;
    },
    setLiked: (state: StateProps, action: PayloadAction<MediaItems>) => {
      state.data.liked = action.payload;
    },
    setLists: (state: StateProps, action: PayloadAction<List[]>) => {
      state.data.lists = action.payload;
    },
    setReviews: (state: StateProps, action: PayloadAction<UserReview[]>) => {
      state.data.reviews = action.payload;
    }
  }
});

export const { setTheme, setRecentSearches, setRecentlyViewed, setLiked, setLists, setReviews } = userSlice.actions;

export default userSlice.reducer;
