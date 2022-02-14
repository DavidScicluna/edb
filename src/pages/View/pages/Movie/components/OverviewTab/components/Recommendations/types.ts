import { FullMovie, PartialMovie } from '../../../../../../../../common/types/movie';

export type RecommendationsProps = {
  title?: FullMovie['title'];
  recommendations?: PartialMovie[];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
