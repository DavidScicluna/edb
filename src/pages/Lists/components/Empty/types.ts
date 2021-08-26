import { List } from '../../../../store/slices/User/types';

export type EmptyListProps = {
  mediaTypeLabel?: 'movies' | 'tv shows';
} & Omit<List, 'description' | 'date' | 'results'>;
