import { Review } from '../../../../common/types/movie';
import { Response } from '../../../../common/types/types';

export type ReviewsTabProps = {
  reviews?: Response<Review[]>;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  hasNextPage?: boolean;
  onFetchNextPage: () => void;
};
