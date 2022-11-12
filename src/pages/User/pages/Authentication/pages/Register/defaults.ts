import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';

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
	color: defaultColor,
	colorMode: defaultColorMode
};

export const profileDefaultValues: ProfileForm = {
	avatar_path: '',
	background_path: ''
};
