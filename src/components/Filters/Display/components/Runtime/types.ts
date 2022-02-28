import { Filters } from '../../../types';

export type RuntimeProps = {
	runtimes: Filters['runtime'];
	onClick?: () => void;
	onDelete?: () => void;
};
