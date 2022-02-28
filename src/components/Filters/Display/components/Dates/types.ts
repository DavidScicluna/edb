import { Filters } from '../../../types';

export type DatesProps = {
	dates: Filters['dates'];
	onClick?: () => void;
	onDelete?: () => void;
};
