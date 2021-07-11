import { MediaItem, List } from '../../../../store/slices/User/types';

export type AllProps = {
  list: List;
  movies: MediaItem[];
  tv: MediaItem[];
};
