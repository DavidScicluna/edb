import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps, Country, Language, Job, Genre } from './types';

const initialState: StateProps = {
  data: {
    countries: [],
    languages: [],
    jobs: [],
    genres: {
      movie: [],
      tv: []
    }
  }
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setCountries: (state: StateProps, action: PayloadAction<Country[]>) => {
      state.data.countries = action.payload;
    },
    setLanguages: (state: StateProps, action: PayloadAction<Language[]>) => {
      state.data.languages = action.payload;
    },
    setJobs: (state: StateProps, action: PayloadAction<Job[]>) => {
      state.data.jobs = action.payload;
    },
    setMovieGenres: (state: StateProps, action: PayloadAction<Genre[]>) => {
      state.data.genres.movie = action.payload;
    },
    setTVGenres: (state: StateProps, action: PayloadAction<Genre[]>) => {
      state.data.genres.tv = action.payload;
    }
  }
});

export const { setCountries, setLanguages, setJobs, setMovieGenres, setTVGenres } = optionsSlice.actions;

export default optionsSlice.reducer;
