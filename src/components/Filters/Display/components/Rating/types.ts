import { Filters } from '../../../types';

export type RatingProps = {
	ratings: Filters['rating'];
	onClick?: () => void;
	onDelete?: () => void;
};
