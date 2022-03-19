import { Credentials, Info, InfoGenres, Theme } from '../../../store/slices/Users/types';

export type DetailsForm = {
	firstName: Info['name'];
	lastName: Info['name'];
	bio: Info['bio'];
} & Omit<Credentials, 'rememberMe'>;

export type GenresForm = InfoGenres;

export type CustomizationForm = Theme;

export type ProfileForm = {
	avatar_path: Info['avatar_path'];
	background_path: Info['background_path'];
};
