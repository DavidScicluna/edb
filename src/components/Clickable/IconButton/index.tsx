import { ReactElement, forwardRef } from 'react';

import { ColorMode, useTheme, useColorMode, IconButton as CUIIconButton, Center } from '@chakra-ui/react';

import _ from 'lodash';

import Spinner from './components/Spinner';
import useStyles from './styles';
import { IconButtonRef, IconButtonProps } from './types';

import { Theme } from '../../../theme/types';

const IconButton = forwardRef<IconButtonRef, IconButtonProps>(function IconButton(props, ref): ReactElement {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const {
		children,
		color = 'gray',
		colorMode: colorModeProp,
		isDisabled = false,
		isLoading = false,
		size = 'md',
		variant = 'contained',
		sx,
		...rest
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const style = useStyles(theme, { color, isLoading, variant });

	return (
		<CUIIconButton
			{...rest}
			ref={ref}
			tabIndex={0}
			isDisabled={isLoading || isDisabled}
			variant='unstyled'
			sx={{
				..._.merge(
					style.iconButton.back.default,
					style.iconButton.back[size],
					style[colorMode].back[variant],
					sx?.back || {}
				)
			}}
			_disabled={{
				..._.merge(
					style.iconButton.disabled.default,
					style.iconButton.disabled[size],
					style[colorMode].disabled[variant]
				)
			}}
		>
			<Center
				className='icon_button_front'
				sx={{
					..._.merge(
						style.iconButton.front.default,
						style.iconButton.front[size],
						style[colorMode].front[variant],
						sx?.front || {}
					)
				}}
			>
				{isLoading ? <Spinner color={color} colorMode={colorMode} size={size} variant={variant} /> : children}
			</Center>
		</CUIIconButton>
	);
});

export default IconButton;
