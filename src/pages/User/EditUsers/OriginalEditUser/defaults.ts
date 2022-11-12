import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';

import {
	EditUserDetailsForm,
	EditUserPasswordForm,
	EditUserGenresForm,
	EditUserCustomizationForm,
	EditUserAssetsForm
} from './types';

export const detailsDefaultValues: EditUserDetailsForm = {
	firstName: '',
	lastName: '',
	bio: ''
};

export const passwordDefaultValues: EditUserPasswordForm = {
	password: '',
	newPassword: '',
	confirmNewPassword: ''
};

export const genresDefaultValues: EditUserGenresForm = {
	movie: [],
	tv: []
};

export const customizationDefaultValues: EditUserCustomizationForm = {
	color: defaultColor,
	colorMode: defaultColorMode
};

export const assetsDefaultValues: EditUserAssetsForm = {
	avatar_path: '',
	background_path: ''
};
