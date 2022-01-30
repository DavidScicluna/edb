import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { StateProps, Search, RecentlyViewed, MediaItems, List, UserReview, OtherReview, Theme } from './types';

const initialState: StateProps = {
  data: {
    recentSearches: [],
    recentlyViewed: {
      movies: [],
      tv: [],
      people: [],
      companies: [],
      collections: []
    },
    liked: {
      movies: [],
      tv: [],
      people: [],
      companies: []
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
    reviews: {
      user: [],
      other: []
    }
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
    setRecentlyViewed: (state: StateProps, action: PayloadAction<RecentlyViewed>) => {
      state.data.recentlyViewed = action.payload;
    },
    setLiked: (state: StateProps, action: PayloadAction<MediaItems>) => {
      state.data.liked = action.payload;
    },
    setLists: (state: StateProps, action: PayloadAction<List[]>) => {
      state.data.lists = action.payload;
    },
    setUserReviews: (state: StateProps, action: PayloadAction<UserReview[]>) => {
      state.data.reviews.user = action.payload;
    },
    setOtherReviews: (state: StateProps, action: PayloadAction<OtherReview[]>) => {
      state.data.reviews.other = action.payload;
    }
  }
});

export const { setTheme, setRecentSearches, setRecentlyViewed, setLiked, setLists, setUserReviews, setOtherReviews } =
  userSlice.actions;

export default userSlice.reducer;
