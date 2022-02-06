import { PartialMovie } from '../../../../../../../../common/types/movie';

export type RecommendationsProps = {
  recommendations?: PartialMovie[];
  title?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
