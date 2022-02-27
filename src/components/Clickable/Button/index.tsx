import { ReactElement, forwardRef } from 'react';

import { ColorMode, useTheme, useColorMode, Button as CUIButton, Center, HStack } from '@chakra-ui/react';

import _ from 'lodash';

import Spinner from './components/Spinner';
import useStyles from './styles';
import { ButtonRef, ButtonProps } from './types';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../common/utils';
import { Theme, Space } from '../../../theme/types';

const Button = forwardRef<ButtonRef, ButtonProps>(function Button(props, ref): ReactElement {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const {
		children,
		color = 'gray',
		colorMode: colorModeProp,
		renderLeft,
		renderRight,
		isDisabled = false,
		isFullWidth = false,
		isLoading = false,
		size = 'md',
		variant = 'contained',
		sx,
		...rest
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const style = useStyles(theme, { color, isFullWidth, isLoading, size, variant });

	/**
	 * This method will return the appropriate spacing depending on the size passed
	 *
	 * @returns - number: Spacing value
	 */
	const handleReturnSpacing = (): keyof Space => {
		switch (size) {
			case 'sm':
				return 0.5;
			case 'lg':
				return 2;
			default:
				return 1;
		}
	};

	/**
	 * This method will return the appropriate font-size in PX depending on size prop
	 *
	 * @returns - number: Font-size in PX
	 */
	const handleReturnIconSize = (): number => {
		switch (size) {
			case 'sm':
				return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xs, 'rem')) + 2;
			case 'lg':
				return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem')) + 3;
			default:
				return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.sm, 'rem')) + 2;
		}
	};

	const iconSize = `${handleReturnIconSize()}px`;

	return (
		<CUIButton
			{...rest}
			ref={ref}
			tabIndex={0}
			isDisabled={isLoading || isDisabled}
			isFullWidth={isFullWidth}
			variant='unstyled'
			sx={{
				..._.merge(
					style.button.back.default,
					style.button.back[size],
					style[colorMode].back[variant],
					sx?.back || {}
				)
			}}
			_disabled={{
				..._.merge(
					style.button.disabled.default,
					style.button.disabled[size],
					style[colorMode].disabled[variant]
				)
			}}
		>
			<Center
				className='button_front'
				sx={{
					..._.merge(
						style.button.front.default,
						style.button.front[size],
						style[colorMode].front[variant],
						sx?.front || {}
					)
				}}
			>
				{isLoading ? (
					<Spinner color={color} colorMode={colorMode} size={size} variant={variant} />
				) : (
					<HStack width='100%' alignItems='inherit' justifyContent='inherit' spacing={handleReturnSpacing()}>
						{renderLeft
							? renderLeft({
									width: iconSize,
									height: iconSize,
									fontSize: iconSize
							  })
							: null}
						{children ? <span>{children}</span> : null}
						{renderRight
							? renderRight({
									width: iconSize,
									height: iconSize,
									fontSize: iconSize
							  })
							: null}
					</HStack>
				)}
			</Center>
		</CUIButton>
	);
});

export default Button;
