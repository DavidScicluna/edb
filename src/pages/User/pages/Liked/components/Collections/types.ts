import { Collection as MovieCollection } from '../../../../../../common/types/movie';

export type Collection = Omit<MovieCollection, 'parts'>;

export type CollectionsProps = {
  collections: Collection[];
};
