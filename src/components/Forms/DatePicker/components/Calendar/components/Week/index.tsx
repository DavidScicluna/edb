import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';

import { RenderProps, DateObj } from 'dayzed';

import Day from './components/Day';

import { Color } from '../../../../../../../theme/types';

export type WeekProps = {
	color: keyof Color;
	dayzed: RenderProps;
	weekdays: Array<DateObj | ''>;
};

const Week = (props: WeekProps): ReactElement => {
	const { dayzed, color, weekdays } = props;

	return (
		<HStack width='100%' justifyContent='space-between' spacing={0}>
			{weekdays.map((weekday, index) => (
				<Day
					{...(weekday ? dayzed.getDateProps({ dateObj: weekday }) : {})}
					key={index}
					isDisabled={!weekday}
					color={weekday && (weekday.today || weekday.selected) ? color : 'gray'}
					variant={weekday && weekday.selected ? 'contained' : 'text'}
				>
					{weekday ? weekday.date.getDate() : undefined}
				</Day>
			))}
		</HStack>
	);
};

export default Week;
