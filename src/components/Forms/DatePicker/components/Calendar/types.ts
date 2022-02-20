import { RenderProps, Calendar as DCalendarProps } from 'dayzed';

import { Color } from '../../../../../theme/types';

export type CalendarProps = {
	color: keyof Color;
	dayzed: RenderProps;
	onToggleYears: () => void;
	onToggleMonths: () => void;
} & DCalendarProps;
