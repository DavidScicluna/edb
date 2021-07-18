import { MediaItem } from '../../../../store/slices/User/types';

export type AllProps = {
  movies: MediaItem<'movie'>[];
  tv: MediaItem<'tv'>[];
  people: MediaItem<'person'>[];
};
