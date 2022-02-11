import { ReviewsTabProps } from '../../types';

export type OtherReviewsProps = Omit<ReviewsTabProps, 'mediaItem' | 'mediaType'>;
