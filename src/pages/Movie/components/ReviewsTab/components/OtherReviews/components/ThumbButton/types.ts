import { ReviewState, OtherReview } from '../../../../../../../../store/slices/User/types';

export type ThumbButtonProps = {
  review?: OtherReview;
  state: ReviewState;
  label: string;
  isDisabled: boolean;
};
