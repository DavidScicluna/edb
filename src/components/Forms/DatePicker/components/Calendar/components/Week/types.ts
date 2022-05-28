import { Color } from '@davidscicluna/component-library';

import { RenderProps, DateObj } from 'dayzed';

export type WeekProps = {
	color: Color;
	dayzed: RenderProps;
	weekdays: Array<DateObj | ''>;
};
