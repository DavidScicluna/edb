import { UserCredentials, UserInfo, UserInfoGenres, UserTheme } from '../../../../../../store/slices/Users/types';

export type RegisterDetailsForm = Pick<UserCredentials, 'username'> & {
	newPassword: string;
	confirmNewPassword: string;
	firstName: UserInfo['name'];
	lastName: UserInfo['name'];
	bio: UserInfo['bio'];
};

export type RegisterGenresForm = UserInfoGenres;

export type RegisterCustomizationForm = UserTheme;

export type RegisterAssetsForm = {
	avatar_path: UserInfo['avatar_path'];
	background_path: UserInfo['background_path'];
};
