import { ReactElement } from 'react';

import {  IconButton, } from '@davidscicluna/component-library';

import { useColorMode, HStack, Text, Fade } from '@chakra-ui/react';

import isNil from 'lodash/isNil';


import Icon from '../../../../../../Icon';
import years from '../../../../common/data/years';

import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
	const { colorMode } = useColorMode();

	const { currentYears, index, minDate, maxDate, onNavigateClick } = props;

	return (
		<HStack width='100%' justifyContent='space-between' spacing={2}>
			{/* Back Button */}
			<IconButton
				aria-label='Go to previous decade'
				isDisabled={
					minDate ? currentYears.some((year) => year === 1900 || year < minDate.getFullYear()) : false
				}
				onClick={() => onNavigateClick('back')}
				size='lg'
				variant='icon'
			>
				<Icon icon='chevron_left' type='outlined' />
			</IconButton>

			{/* Current Decade */}
			<Fade in={!isNil(index)} unmountOnExit>
				<Text
					align='center'
					color={`gray.${colorMode === 'light' ? 400 : 500}`}
					fontSize='md'
					fontWeight='semibold'
				>
					{index ? `${years[index][0]} - ${years[index][years[index].length - 1]}` : 'N/A'}
				</Text>
			</Fade>

			{/* Forward Button */}
			<IconButton
				aria-label='Go to next decade'
				isDisabled={
					maxDate ? currentYears.some((year) => year === 2099 || year > maxDate.getFullYear()) : false
				}
				onClick={() => onNavigateClick('forward')}
				size='lg'
				variant='icon'
			>
				<Icon icon='chevron_right' type='outlined' />
			</IconButton>
		</HStack>
	);
};

export default Header;
