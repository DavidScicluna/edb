import { PartialPerson } from '../../../../../../common/types/person';

export type PeopleProps = {
  query: string;
  results?: PartialPerson[];
  total_results?: number;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
};
