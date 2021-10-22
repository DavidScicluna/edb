import { FullMovie } from '../../../../../common/types/movie';
import { Response, Review } from '../../../../../common/types/types';

export type ReviewsTabProps = {
  movie?: FullMovie;
  reviews?: Response<Review[]>;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  hasNextPage?: boolean;
  onFetchNextPage: () => void;
};
