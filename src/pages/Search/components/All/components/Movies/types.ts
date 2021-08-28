import { PartialMovie } from '../../../../../../common/types/movie';

export type MoviesProps = {
  query: string;
  results?: PartialMovie[];
  total_results?: number;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
};
