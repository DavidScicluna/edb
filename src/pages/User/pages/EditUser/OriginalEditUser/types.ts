import { UserCredentials, UserInfo, UserInfoGenres, UserTheme } from '../../../../../store/slices/Users/types';

export type EditUserDetailsForm = Pick<UserInfo, 'bio'> & {
	firstName: UserInfo['name'];
	lastName: UserInfo['name'];
};

export type EditUserPasswordForm = Pick<UserCredentials, 'password'> & {
	newPassword: string;
	confirmNewPassword: string;
};

export type EditUserGenresForm = UserInfoGenres;

export type EditUserCustomizationForm = UserTheme;

export type EditUserAssetsForm = Pick<UserInfo, 'avatar_path' | 'background_path'>;
