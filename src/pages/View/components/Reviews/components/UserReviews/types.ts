import { ReviewsTabProps } from '../../types';

export type UserReviewsProps = Omit<
	ReviewsTabProps,
	'reviews' | 'isError' | 'isSuccess' | 'hasNextPage' | 'onFetchNextPage'
>;
