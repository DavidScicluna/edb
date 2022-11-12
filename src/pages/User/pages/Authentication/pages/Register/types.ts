import { UserCredentials, UserInfo, UserInfoGenres, UserTheme } from '../../../../../../store/slices/Users/types';

export type DetailsForm = {
	firstName: UserInfo['name'];
	lastName: UserInfo['name'];
	bio: UserInfo['bio'];
} & Omit<UserCredentials, 'rememberMe'>;

export type GenresForm = UserInfoGenres;

export type CustomizationForm = UserTheme;

export type ProfileForm = {
	avatar_path: UserInfo['avatar_path'];
	background_path: UserInfo['background_path'];
};
