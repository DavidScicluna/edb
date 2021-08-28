import { PartialTV } from '../../../../../../common/types/tv';

export type TVProps = {
  query: string;
  results?: PartialTV[];
  total_results?: number;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
};
