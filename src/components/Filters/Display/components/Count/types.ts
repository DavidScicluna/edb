import { Filters } from '../../../types';

export type CountProps = {
	counts: Filters['count'];
	onClick?: () => void;
	onDelete?: () => void;
};
