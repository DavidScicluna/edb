import { ColorMode } from '@chakra-ui/react';

import { MediaType, Review, FullCompany } from '../../../common/types';
import { FullMovie, Collection } from '../../../common/types/movie';
import { FullPerson } from '../../../common/types/person';
import { FullTV } from '../../../common/types/tv';
import { Color } from '../../../theme/types';

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

export type Background = ColorMode | 'system';

export type Theme = {
	color: keyof Omit<Color, 'gray' | 'red'>;
	background: Background;
};

export type StateProps = {
	data: {
		recentSearches: Search[];
		recentlyViewed: MediaItems;
		liked: MediaItems;
		lists: List[];
		reviews: UserReviews;
	};
	ui: {
		theme: Theme;
	};
};
