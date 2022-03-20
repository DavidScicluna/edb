import { ColorMode } from '@chakra-ui/react';

import { PayloadAction } from '@reduxjs/toolkit';

import { MediaType, Review, FullCompany, Genre } from '../../../common/types';
import { FullMovie, Collection } from '../../../common/types/movie';
import { FullPerson } from '../../../common/types/person';
import { FullTV } from '../../../common/types/tv';
import { Color } from '../../../theme/types';

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
	bio?: string;
	avatar_path: string;
	background_path: string;
	prefers?: InfoGenres;
};

export type SearchType = MediaType | 'collection' | string;

export type Search = {
	id: string;
	label: string;
	date: string;
	searchTypes?: SearchType[];
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
	dateAdded?: string;
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
	date: string;
	results: Omit<MediaItems, 'people' | 'companies' | 'collections'>;
};

export type ReviewState = 'isLiked' | 'isDisliked';

export type UserReview = {
	mediaItem: { mediaType: Omit<MediaType, 'person' | 'company' | 'collection'> } & (FullMovie | FullTV);
} & Omit<Review, 'media_id' | 'media_title' | 'media_type'>;

export type OtherReview = {
	state?: ReviewState;
} & Omit<Review, 'media_id' | 'media_title' | 'media_type'>;

export type UserReviews = {
	user: UserReview[];
	other: OtherReview[];
};

export type ThemeColor = keyof Omit<Color, 'gray' | 'red' | 'green' | 'yellow'>;
export type ThemeColorMode = ColorMode | 'system';

export type Theme = {
	color: ThemeColor;
	colorMode: ThemeColorMode;
};

export type User = {
	data: {
		id: string;
		credentials?: Credentials;
		info: Info;
		recentSearches?: Search[];
		recentlyViewed?: Omit<MediaItems, 'companies'>;
		liked?: MediaItems;
		lists?: List[];
		reviews?: UserReviews;
		signedInAt?: string;
	};
	ui: {
		theme: Theme;
	};
};

export type UserAction<P> = PayloadAction<{ id: string; data: P }>;

export type StateProps = {
	data: {
		users: User[];
	};
};
