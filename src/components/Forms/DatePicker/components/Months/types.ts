import { Color } from '../../../../../theme/types';

export type MonthsProps = {
	color: keyof Color;
	month: number;
	year: number;
	minDate?: Date;
	maxDate?: Date;
	onMonthClick: (month: number) => void;
};
