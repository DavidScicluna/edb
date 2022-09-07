import { Color } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import { PayloadAction } from '@reduxjs/toolkit';

import { MediaType, FullCompany, Genre } from '../../../common/types';
import { FullMovie, Collection } from '../../../common/types/movie';
import { FullPerson } from '../../../common/types/person';
import { FullTV } from '../../../common/types/tv';

export type GetUserProps = { users: User[]; user: string };

export type UpdateUsersProps = { users: User[]; user: User };

export type Credentials = {
	username: string;
	password: string;
	rememberMe: boolean;
};

export type InfoGenres = {
	movie: Genre[];
	tv: Genre[];
};

export type Info = {
	name: string;
	bio: string;
	avatar_path: string;
	background_path: string;
	prefers: InfoGenres;
};

export type SearchType = MediaType & string;

export type Search = {
	id: string;
	label: string;
	date: string;
	searchTypes: SearchType[];
};

export type GetMediaType<MT extends MediaType> = MT extends 'movie'
	? FullMovie
	: MT extends 'tv'
	? FullTV
	: MT extends 'person'
	? FullPerson
	: MT extends 'person'
	? FullCompany
	: Collection;

export type MediaItem<MT extends MediaType> = {
	dateAdded: string;
} & GetMediaType<MT>;

export type MediaItems = {
	movies: MediaItem<'movie'>[];
	tv: MediaItem<'tv'>[];
	people: MediaItem<'person'>[];
	companies: MediaItem<'company'>[];
	collections: MediaItem<'collection'>[];
};

export type List = {
	id: string;
	label: string;
	description?: string;
	updatedAt: string;
	createdAt: string;
	results: Omit<MediaItems, 'people' | 'companies' | 'collections'>;
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

export type UserTheme = {
	color: UserThemeColor;
	colorMode: UserThemeColorMode;
};

export type User = {
	data: {
		id: string;
		credentials: Credentials;
		info: Info;
		recentSearches: Search[];
		recentlyViewed: Omit<MediaItems, 'companies'>;
		liked: MediaItems;
		lists: List[];
		// reviews: UserReviews;
		signedInAt: string;
		updatedAt: string;
		createdAt: string;
	};
	ui: {
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
