import { ColorMode } from '@chakra-ui/react';

import { MediaType, Review, PartialCompany } from '../../../common/types';
import { FullMovie, PartialMovie, Collection } from '../../../common/types/movie';
import { PartialPerson } from '../../../common/types/person';
import { FullTV, PartialTV } from '../../../common/types/tv';
import { Color } from '../../../theme/types';

export type SearchType = MediaType | 'company' | 'collection' | string;

export type Search = {
  id: string;
  label: string;
  date: string;
  searchTypes?: SearchType[];
};

export type GetMediaType<MT extends MediaType> = MT extends 'movie'
  ? PartialMovie
  : MT extends 'tv'
  ? PartialTV
  : MT extends 'person'
  ? PartialPerson
  : MT extends 'collection'
  ? Collection
  : PartialCompany;

export type MediaItem<MT extends MediaType> = {
  dateAdded?: string;
} & GetMediaType<MT>;

export type MediaItems = {
  movies: MediaItem<'movie'>[];
  tv: MediaItem<'tv'>[];
  people: MediaItem<'person'>[];
  collections: MediaItem<'collection'>[];
  companies: MediaItem<'company'>[];
};

export type List = {
  id: string;
  label: string;
  description?: string;
  date: string;
  results: Omit<MediaItems, 'people' | 'collections' | 'companies'>;
};

export type ReviewState = 'isLiked' | 'isDisliked';

export type UserReview = {
  mediaItem: { mediaType: Omit<MediaType, 'person'> } & Partial<FullMovie & FullTV>;
} & Review;

export type OtherReview = {
  state?: ReviewState;
} & Review;

export type UserReviews = {
  user: UserReview[];
  other: OtherReview[];
};

export type Theme = {
  color: keyof Omit<Color, 'gray' | 'red'>;
  background: ColorMode | 'system';
};

export type StateProps = {
  data: {
    recentSearches: Search[];
    recentlyViewed: MediaItems;
    liked: Omit<MediaItems, 'collections'>;
    lists: List[];
    reviews: UserReviews;
  };
  ui: {
    theme: Theme;
  };
};
