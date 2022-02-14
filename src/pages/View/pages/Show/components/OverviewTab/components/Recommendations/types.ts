import { FullTV, PartialTV } from '../../../../../../../../common/types/tv';

export type RecommendationsProps = {
  name?: FullTV['name'];
  recommendations?: PartialTV[];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
