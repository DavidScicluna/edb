import { Collection } from '../../../../common/types/types';

export type CollectionProps = Omit<Collection, 'id' | 'overview' | 'poster_path' | 'backdrop_path'>;
