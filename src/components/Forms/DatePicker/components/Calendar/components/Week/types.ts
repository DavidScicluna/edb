import { RenderProps, DateObj } from 'dayzed';

import { Color } from '../../../../../../../theme/types';

export type WeekProps = {
	color: keyof Color;
	dayzed: RenderProps;
	weekdays: Array<DateObj | ''>;
};
