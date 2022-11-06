import { Color } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import { PayloadAction } from '@reduxjs/toolkit';

import { MediaType, FullCompany, Genre, Language } from '../../../common/types';
import { FullMovie, Collection } from '../../../common/types/movie';
import { FullPerson } from '../../../common/types/person';
import { FullTV } from '../../../common/types/tv';

export type GetUserProps = { users: User[]; user: string };

export type UpdateUsersProps = { users: User[]; user: User };

export type UserCredentials = {
	username: string;
	password: string;
	rememberMe: boolean;
};

export type UserInfoGenres = {
	movie: Genre[];
	tv: Genre[];
};

export type UserInfo = {
	name: string;
	bio: string;
	avatar_path: string;
	background_path: string;
	prefers: UserInfoGenres;
};

export type UserSearchType = MediaType | string;

export type UserSearch = {
	id: string;
	label: string;
	searchedAt: string;
	searchTypes: UserSearchType[];
};

export type GetMediaType<MT extends MediaType> = MT extends 'movie'
	? FullMovie
	: MT extends 'tv'
	? FullTV
	: MT extends 'person'
	? FullPerson
	: MT extends 'company'
	? FullCompany
	: Collection;

export type MediaItem<MT extends MediaType> = {
	mediaItem: GetMediaType<MT>;
	mediaType: MT;
	addedAt: string;
};

export type MediaItems = {
	movie: MediaItem<'movie'>[];
	tv: MediaItem<'tv'>[];
	person: MediaItem<'person'>[];
	company: MediaItem<'company'>[];
	collection: MediaItem<'collection'>[];
};

export type UserListMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UserListMediaItems = Omit<MediaItems, 'person' | 'company' | 'collection'>;

export type UserList = {
	id: string;
	label: string;
	description?: string;
	updatedAt: string;
	createdAt: string;
	mediaItems: UserListMediaItems;
};

// export type ReviewState = 'isLiked' | 'isDisliked';

// export type UserReview = {
// 	mediaItem: { mediaType: Omit<MediaType, 'person' | 'company' | 'collection'> } & (FullMovie | FullTV);
// } & Omit<Review, 'media_id' | 'media_title' | 'media_type'>;

// export type OtherReview = {
// 	state?: ReviewState;
// } & Omit<Review, 'media_id' | 'media_title' | 'media_type'>;

// export type UserReviews = {
// 	user: UserReview[];
// 	other: OtherReview[];
// };

export type UserThemeColor = Exclude<Color, 'transparent' | 'black' | 'white' | 'gray' | 'red' | 'green' | 'yellow'>;
export type UserThemeColorMode = ColorMode | 'system';

export type UserLanguage = Language; // TODO: Replace type with language iso codes

export type UserTheme = {
	color: UserThemeColor;
	colorMode: UserThemeColorMode;
};

export type User = {
	data: {
		id: string;
		credentials: UserCredentials;
		info: UserInfo;
		recentSearches: UserSearch[];
		recentlyViewed: Omit<MediaItems, 'companies'>;
		liked: MediaItems;
		lists: UserList[];
		// reviews: UserReviews;
		signedInAt: string;
		updatedAt: string;
		createdAt: string;
	};
	ui: {
		language: UserLanguage;
		theme: UserTheme;
	};
};

export type UserAction<P> = PayloadAction<{ id: string; data: P }>;

export type StateProps = {
	data: {
		activeUser: User;
		users: User[];
	};
};
