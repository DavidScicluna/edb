import { PartialMovie } from '../../../../../../../../common/types/movie';

export type SimilarProps = {
  similar?: PartialMovie[];
  title?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
