import { Color } from '@davidscicluna/component-library';

import { RenderProps, Calendar as DCalendarProps } from 'dayzed';

export type CalendarProps = {
	color: Color;
	dayzed: RenderProps;
	onToggleYears: () => void;
	onToggleMonths: () => void;
} & DCalendarProps;
