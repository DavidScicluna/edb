import { FullTV, PartialTV } from '../../../../../../../../common/types/tv';

export type SimilarProps = {
  name?: FullTV['name'];
  similar?: PartialTV[];
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
};
