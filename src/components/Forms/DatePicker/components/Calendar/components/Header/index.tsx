import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';

import { HeaderProps } from './types';

import Button from '../../../../../../Clickable/Button';
import IconButton from '../../../../../../Clickable/IconButton';
import Icon from '../../../../../../Icon';
import { full } from '../../../../common/data/months';

const Header = (props: HeaderProps): ReactElement => {
	const { dayzed, month, year, onToggleYears, onToggleMonths } = props;

	return (
		<HStack width='100%' justifyContent='space-between' spacing={2}>
			{/* Back Button */}
			<IconButton
				{...dayzed.getBackProps({ calendars: dayzed.calendars })}
				aria-label={`Go to ${full[month - 1] || ''} month`}
				size='lg'
				variant='icon'
			>
				<Icon icon='chevron_left' type='outlined' />
			</IconButton>

			{/* Month & Year */}
			<HStack spacing={0}>
				<Button color='gray' onClick={() => onToggleMonths()} size='lg' variant='text'>
					{full[month] || 'Month'}
				</Button>
				<Button color='gray' onClick={() => onToggleYears()} size='lg' variant='text'>
					{year}
				</Button>
			</HStack>

			{/* Forward Button */}
			<IconButton
				{...dayzed.getForwardProps({ calendars: dayzed.calendars })}
				aria-label={`Go to ${full[month + 1] || ''} month`}
				size='lg'
				variant='icon'
			>
				<Icon icon='chevron_right' type='outlined' />
			</IconButton>
		</HStack>
	);
};

export default Header;
