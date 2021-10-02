import { Review } from '../../../../../../../../common/types/movie';

export type EditReviewProps = {
  review: Review;
};

export type Form = {
  review: string;
  rating: number | null;
};
