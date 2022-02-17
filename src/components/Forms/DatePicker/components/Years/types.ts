import { Color } from '../../../../../theme/types';

export type YearsProps = {
	color: keyof Color;
	year: number;
	minDate?: Date;
	maxDate?: Date;
	onYearsClick: (year: number) => void;
};
