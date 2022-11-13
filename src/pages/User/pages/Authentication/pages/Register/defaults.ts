import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';

import { RegisterDetailsForm, RegisterGenresForm, RegisterCustomizationForm, RegisterAssetsForm } from './types';

export const detailsDefaultValues: RegisterDetailsForm = {
	username: '',
	newPassword: '',
	confirmNewPassword: '',
	firstName: '',
	lastName: '',
	bio: ''
};

export const genresDefaultValues: RegisterGenresForm = {
	movie: [],
	tv: []
};

export const customizationDefaultValues: RegisterCustomizationForm = {
	color: defaultColor,
	colorMode: defaultColorMode
};

export const assetsDefaultValues: RegisterAssetsForm = {
	avatar_path: '',
	background_path: ''
};
