import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateProps } from './types';

import { Country, Language, Job, Genre, Certifications } from '../../../common/types';

const initialState: StateProps = {
	data: {
		countries: [],
		languages: [],
		jobs: [],
		genres: {
			movie: [],
			tv: []
		},
		certifications: {
			movie: undefined,
			tv: undefined
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
		},
		setMovieCertifications: (state: StateProps, action: PayloadAction<Certifications>) => {
			state.data.certifications.movie = action.payload;
		},
		setTVCertifications: (state: StateProps, action: PayloadAction<Certifications>) => {
			state.data.certifications.tv = action.payload;
		}
	}
});

export const {
	setCountries,
	setLanguages,
	setJobs,
	setMovieGenres,
	setTVGenres,
	setMovieCertifications,
	setTVCertifications
} = optionsSlice.actions;

export default optionsSlice.reducer;
