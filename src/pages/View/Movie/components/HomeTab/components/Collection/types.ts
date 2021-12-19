import { Collection } from '../../../../../../../common/types';

export type CollectionProps = { id?: number } & Omit<Collection, 'id' | 'overview' | 'poster_path' | 'backdrop_path'>;
