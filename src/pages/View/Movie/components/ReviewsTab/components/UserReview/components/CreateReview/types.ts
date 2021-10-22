import { ReviewsTabProps } from '../../../../types';

export type CreateReviewProps = {
  movie: ReviewsTabProps['movie'];
};

export type Form = {
  review: string;
  rating: number | null;
};
