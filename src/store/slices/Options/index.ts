import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Genre } from '../../../common/types';
import { StateProps } from './types';

const initialState: StateProps = {
  data: {
    data: {
      genres: {
        movie: [],
        tv: []
      }
    },
    hasDownloaded: false
  }
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setMovieGenres: (state: StateProps, action: PayloadAction<Genre[]>) => {
      state.data.data.genres.movie = action.payload;
    },
    setTVGenres: (state: StateProps, action: PayloadAction<Genre[]>) => {
      state.data.data.genres.tv = action.payload;
    },
    toggleHasDownloaded: (state: StateProps, action: PayloadAction<boolean>) => {
      state.data.hasDownloaded = action.payload;
    }
  }
});

export const { setMovieGenres, setTVGenres, toggleHasDownloaded } = optionsSlice.actions;

export default optionsSlice.reducer;
