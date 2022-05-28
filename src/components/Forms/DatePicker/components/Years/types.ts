import { Color } from '@davidscicluna/component-library';

export type YearsProps = {
	color: Color;
	year: number;
	minDate?: Date;
	maxDate?: Date;
	onYearsClick: (year: number) => void;
};
