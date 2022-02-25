import { ReactElement } from 'react';

import { useColorMode, Center, Text } from '@chakra-ui/react';

import _ from 'lodash';

import { NavigationProps } from './types';

import IconButton from '../../../../../Clickable/IconButton';
import Icon from '../../../../../Icon';

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
				{_.compact([current + 1, total]).join(' / ')}
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
