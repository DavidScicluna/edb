import { UserReview } from '../../../../../../../../store/slices/User/types';

export type Form = {
  review: string;
  rating: number | null;
};

export type EditReviewProps = {
  review: UserReview;
};
