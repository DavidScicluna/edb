import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, Center, Icon } from '@chakra-ui/react';

import { StarOutlineOutlined as StarOutlineOutlinedIcon, StarOutlined as StarOutlinedIcon } from '@material-ui/icons';

import { StarProps } from './types';

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
			_focus={{ boxShadow: 'none' }}
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
				as={isChecked ? StarOutlinedIcon : StarOutlineOutlinedIcon}
				sx={{
					fontSize: `${isSm ? theme.fontSizes.xl : theme.fontSizes['2xl']} !important`,
					transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
				}}
			/>
		</Center>
	);
};

export default Star;
