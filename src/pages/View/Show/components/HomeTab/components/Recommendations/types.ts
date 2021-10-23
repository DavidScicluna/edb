import { PartialTV } from '../../../../../../../common/types/tv';

export type RecommendationsProps = {
  recommendations?: PartialTV[];
  name?: string;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
