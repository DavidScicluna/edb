import { PartialMovie } from '../../../../../../common/types/movie';

export type RecommendationsProps = {
  recommendations?: PartialMovie[];
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
