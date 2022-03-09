import { UserReview } from '../../../../../../../../store/slices/Users/types';

export type Form = {
	review: string;
	rating: number | null;
};

export type EditReviewProps = {
	review: UserReview;
};
