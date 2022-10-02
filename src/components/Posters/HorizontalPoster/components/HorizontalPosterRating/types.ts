import { HorizontalPosterRating } from '../../types';

export type HorizontalPosterRatingProps = Pick<HorizontalPosterRating, 'rating' | 'count'> & {
	inView: boolean;
};
