import { ReactElement } from 'react';

import {  IconButton, } from '@davidscicluna/component-library';

import { useColorMode, Center, Text } from '@chakra-ui/react';

import compact from 'lodash/compact';


import Icon from '../../../../../Icon';

import { NavigationProps } from './types';

const Navigation = (props: NavigationProps): ReactElement => {
	const { colorMode } = useColorMode();

	const { current, total, onNavigation } = props;

	return (
		<Center backgroundColor='transparent' p={2}>
			{/* Left button */}
			<IconButton
				aria-label='Previous photo'
				isDisabled={current + 1 <= 1}
				onClick={() => onNavigation('prev')}
				variant='icon'
			>
				<Icon icon='arrow_back' type='outlined' />
			</IconButton>

			{/* Current Slide */}
			<Text align='center' color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='md'>
				{compact([current + 1, total]).join(' / ')}
			</Text>

			{/* Right button */}
			<IconButton
				aria-label='Next photo'
				isDisabled={current + 1 >= total}
				onClick={() => onNavigation('next')}
				variant='icon'
			>
				<Icon icon='arrow_forward' type='outlined' />
			</IconButton>
		</Center>
	);
};

export default Navigation;
