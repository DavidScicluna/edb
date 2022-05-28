import { Color } from '@davidscicluna/component-library';

export type MonthsProps = {
	color: Color;
	month: number;
	year: number;
	minDate?: Date;
	maxDate?: Date;
	onMonthClick: (month: number) => void;
};
