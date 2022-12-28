import { UserReview } from '../../../../../../store/slices/Users/types';
import { ViewReviewsMediaType } from '../../types';
import { ViewReviewsMyReviewsProps } from '../ViewReviewsMyReviews/types';

type Picked = 'mediaItem' | 'mediaType';

export type ViewReviewsMyReviewProps<MT extends ViewReviewsMediaType> = Pick<ViewReviewsMyReviewsProps<MT>, Picked> & {
	review: UserReview;
};
