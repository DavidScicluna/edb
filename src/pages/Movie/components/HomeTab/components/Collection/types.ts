import { FullMovie } from '../../../../../../common/types/movie';
import { Collection } from '../../../../../../common/types/types';

export type CollectionProps = { movieId?: FullMovie['id'] } & Omit<
  Collection,
  'id' | 'overview' | 'poster_path' | 'backdrop_path'
>;
