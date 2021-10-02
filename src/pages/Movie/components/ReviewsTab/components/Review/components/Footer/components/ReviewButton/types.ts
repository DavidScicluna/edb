import { ReviewState, UserReview } from '../../../../../../../../../../store/slices/User/types';

export type ReviewButtonProps = {
  review?: UserReview;
  state: ReviewState;
  label: string;
};
