import { Collection as MovieCollection } from '../../../../../../../../../common/types/movie';

export type VerticalCollectionPosterProps = {
  collection?: Omit<MovieCollection, 'parts'>;
  width?: string | string[];
  isLoading?: boolean;
};
