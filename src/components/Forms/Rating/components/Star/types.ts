import { RatingProps } from '../../types';

export type StarProps = {
	isChecked: boolean;
	hoveringNumber: number;
	onHover: (value: number) => void;
} & Omit<RatingProps, 'name'>;
