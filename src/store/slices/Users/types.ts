import { Color, Nullable } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';

import { PayloadAction } from '@reduxjs/toolkit';

import { MediaType, FullCompany, Genre, Language, Review, ReviewAuthor } from '../../../common/types';
import { FullMovie, Collection } from '../../../common/types/movie';
import { FullPerson } from '../../../common/types/person';
import { FullTV } from '../../../common/types/tv';

export type GetUserProps = { users: Users; user: string };

export type UpdateUsersProps = { users: Users; user: User };

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
export type UserSearches = UserSearch[];

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

export type UserRecentlyViewed = Omit<MediaItems, 'company'>;

export type UserRecentlyViewedMediaType = Exclude<MediaType, 'company'>;

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
export type UserLists = UserList[];

export type UserReviewMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UserReview = Pick<Review, 'id' | 'content'> & {
	updatedAt: string;
	createdAt: string;
} & Pick<ReviewAuthor, 'rating'>;
export type UserReviews = UserReview[];

export type UserReviewsMediaItem<MT extends UserReviewMediaType> = {
	mediaItem: GetMediaType<MT>;
	mediaType: MT;
	reviews: UserReviews;
};
export type UserReviewsMediaItems<MT extends UserReviewMediaType> = UserReviewsMediaItem<MT>[];

export type UserReviewsAllMediaItems = {
	movie: UserReviewsMediaItems<'movie'>;
	tv: UserReviewsMediaItems<'tv'>;
};

export type OtherReviewState = Nullable<'isLiked' | 'isDisliked'>;

export type OtherReview = {
	state: OtherReviewState;
	review: Review;
	updatedAt: string;
	addedAt: string;
};
export type OtherReviews = OtherReview[];

export type UserAllReviews = {
	user: UserReviewsAllMediaItems;
	other: OtherReviews;
};

export type UserThemeColor = Exclude<Color, 'transparent' | 'black' | 'white' | 'gray' | 'red' | 'green' | 'yellow'>;
export type UserThemeColors = UserThemeColor[];

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
		recentSearches: UserSearches;
		recentlyViewed: UserRecentlyViewed;
		liked: MediaItems;
		lists: UserLists;
		reviews: UserAllReviews;
		signedInAt: string;
		updatedAt: string;
		createdAt: string;
	};
	ui: {
		language: UserLanguage;
		theme: UserTheme;
	};
};
export type Users = User[];

export type UserAction<P> = PayloadAction<{ id: string; data: P }>;

export type StateProps = {
	data: {
		activeUser: User;
		users: Users;
	};
};
