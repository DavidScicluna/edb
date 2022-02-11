import { ReviewsTabProps } from '../../types';

export type UserReviewProps = Omit<
  ReviewsTabProps,
  'reviews' | 'isError' | 'isSuccess' | 'hasNextPage' | 'onFetchNextPage'
>;
