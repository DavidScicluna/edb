import { DetailsForm, GenresForm, CustomizationForm, ProfileForm } from './types';

export const detailsDefaultValues: DetailsForm = {
	username: '',
	password: '',
	firstName: '',
	lastName: '',
	bio: ''
};

export const genresDefaultValues: GenresForm = {
	movie: [],
	tv: []
};

export const customizationDefaultValues: CustomizationForm = {
	color: 'light_blue',
	colorMode: 'light'
};

export const profileDefaultValues: ProfileForm = {
	avatar_path: '',
	background_path: ''
};
