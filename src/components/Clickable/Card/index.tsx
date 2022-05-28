import { ReactElement, forwardRef } from 'react';

import { ColorMode, useTheme, useColorMode, Button as CUIButton, Center } from '@chakra-ui/react';
import merge from 'lodash/merge';

import useStyles from './styles';
import { CardRef, CardProps } from './types';

const Card = forwardRef<CardRef, CardProps>(function Card(props, ref): ReactElement {
	const theme = useTheme();
	const { colorMode: colorModeHook } = useColorMode();

	const {
		children,
		color = 'gray',
		colorMode: colorModeProp,
		isFullWidth = false,
		isLight = false,
		isDisabled = false,
		isFixed: isFixedProp = false,
		isClickable = false,
		sx,
		...rest
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;
	const isFixed: boolean = isFixedProp || !isClickable;

	const style = useStyles(theme, { color, isFullWidth, isLight, isClickable, isFixed });

	return (
		<CUIButton
			ref={ref}
			tabIndex={0}
			isDisabled={isDisabled}
			isFullWidth={isFullWidth}
			variant='unstyled'
			sx={{ ...merge(style.card.back, style[colorMode].back, sx?.back || {}) }}
			_disabled={{ ...merge(style.card.disabled, style[colorMode].disabled) }}
		>
			<Center
				{...rest}
				className='card_front'
				sx={{ ...merge(style.card.front, style[colorMode].front, sx?.front || {}) }}
			>
				{children}
			</Center>
		</CUIButton>
	);
});

export default Card;
