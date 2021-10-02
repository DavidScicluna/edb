import { PartialMovie, Review } from '../../../common/types/movie';
import { PartialPerson } from '../../../common/types/person';
import { PartialTV } from '../../../common/types/tv';
import { MediaType } from '../../../common/types/types';
import { Color } from '../../../theme/types';

type SearchType = 'isTrending' | 'isKeyword';

export type Search = {
  id: string;
  label: string;
  date: string;
  type?: SearchType;
  mediaType?: MediaType;
};

export type GetMediaType<MT extends MediaType> = MT extends 'movie'
  ? PartialMovie
  : MT extends 'tv'
  ? PartialTV
  : PartialPerson;

export type MediaItem<MT extends MediaType> = {
  dateAdded?: string;
} & GetMediaType<MT>;

export type MediaItems = {
  movies: MediaItem<'movie'>[];
  tv: MediaItem<'tv'>[];
  people: MediaItem<'person'>[];
};

export type List = {
  id: string;
  label: string;
  description?: string;
  date: string;
  results: Omit<MediaItems, 'people'>;
};

export type ReviewState = 'isLiked' | 'isDisliked';

export type OtherReview = {
  state?: ReviewState;
} & Review;

export type UserReviews = {
  user: Review[];
  other: OtherReview[];
};

export type Theme = {
  color: Omit<Color, 'gray' | 'red'>;
  background: 'light' | 'dark';
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
