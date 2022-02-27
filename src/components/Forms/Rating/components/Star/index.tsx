import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, Center } from '@chakra-ui/react';

import { StarProps } from './types';

import Icon from '../../../../../components/Icon';
import { Theme } from '../../../../../theme/types';

const Star = ({ value, hoveringNumber, isChecked, onChange, onHover }: StarProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<Center
			cursor='pointer'
			p={isSm ? 0.5 : 1}
			onClick={() => onChange(value)}
			onMouseEnter={() => onHover(value)}
			onMouseLeave={() => onHover(0)}
			_focus={{ boxShadow: 'none', color: `yellow.${colorMode === 'light' ? 700 : 200}` }}
			_hover={{
				transform: 'scale(1.25)',
				color: `yellow.${colorMode === 'light' ? 600 : 300}`
			}}
			sx={{
				color:
					isChecked || value < hoveringNumber
						? `yellow.${colorMode === 'light' ? 500 : 400}`
						: `gray.${colorMode === 'light' ? 400 : 500}`,
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
			}}
		>
			<Icon
				icon={isChecked ? 'star' : 'star_outline'}
				type='outlined'
				fontSize={isSm ? theme.fontSizes.xl : theme.fontSizes['2xl']}
				sx={{ transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}` }}
			/>
		</Center>
	);
};

export default Star;
