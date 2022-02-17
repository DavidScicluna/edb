import { ReactElement } from 'react';

import { useColorMode, Center, Text } from '@chakra-ui/react';

import {
	ArrowBackOutlined as ArrowBackOutlinedIcon,
	ArrowForwardOutlined as ArrowForwardOutlinedIcon
} from '@material-ui/icons';
import _ from 'lodash';

import { NavigationProps } from './types';

import IconButton from '../../../../../Clickable/IconButton';

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
				<ArrowBackOutlinedIcon />
			</IconButton>

			{/* Current Slide */}
			<Text align='center' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md'>
				{_.compact([current + 1, total]).join(' / ')}
			</Text>

			{/* Right button */}
			<IconButton
				aria-label='Next photo'
				isDisabled={current + 1 >= total}
				onClick={() => onNavigation('next')}
				variant='icon'
			>
				<ArrowForwardOutlinedIcon />
			</IconButton>
		</Center>
	);
};

export default Navigation;
