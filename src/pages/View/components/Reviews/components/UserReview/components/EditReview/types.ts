import { UserReview } from '../../../../../../../../store/slices/User/types';

export type EditReviewProps = {
  review: UserReview;
};

export type Form = {
  review: string;
  rating: number | null;
};
