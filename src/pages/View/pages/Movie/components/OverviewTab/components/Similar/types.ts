import { FullMovie, PartialMovie } from '../../../../../../../../common/types/movie';

export type SimilarProps = {
  title?: FullMovie['title'];
  similar?: PartialMovie[];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
