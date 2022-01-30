import { Collection as MovieCollection } from '../../../../../../../../../common/types/movie';

export type HorizontalCollectionPosterProps = {
  collection?: Omit<MovieCollection, 'parts'>;
  isLoading?: boolean;
};
