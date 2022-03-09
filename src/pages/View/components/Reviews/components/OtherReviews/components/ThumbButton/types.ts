import { ReviewState, OtherReview } from '../../../../../../../../store/slices/Users/types';

export type ThumbButtonProps = {
	review?: OtherReview;
	state: ReviewState;
	label: string;
	isDisabled: boolean;
};
