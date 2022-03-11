import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, useConst, Badge as CUIBadge, HStack, Center } from '@chakra-ui/react';

import merge from 'lodash/merge';
import range from 'lodash/range';
import sample from 'lodash/sample';

import useStyles from './styles';
import { BadgeProps } from './types';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../common/utils';
import { Theme, Space } from '../../theme/types';
import SkeletonText from '../Skeleton/Text';

const dummies = range(25, 200, 5);

const Badge = (props: BadgeProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode: colorModeHook } = useColorMode();

	const {
		children,
		color = 'gray',
		colorMode: colorModeProp,
		renderLeft,
		renderRight,
		isLight = true,
		isLoading = false,
		size = 'md',
		variant = 'contained',
		sx,
		...rest
	} = props;

	const dummy = useConst<number>(sample(dummies) || 75);

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const style = useStyles(theme, { color, isLight, variant });

	/**
	 * This method will return the appropriate spacing depending on the size passed
	 *
	 * @returns - number: Spacing value
	 */
	const handleReturnSpacing = (): keyof Space => {
		switch (size) {
			case 'xl':
			case '2xl':
			case '3xl':
			case '4xl':
				return 1;
			default:
				return 0.5;
		}
	};

	const iconHeightSize = `${
		handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes[size], 'rem')) + 4
	}px`;

	return (
		<CUIBadge
			{...rest}
			variant='unstyled'
			sx={{ ...merge(style.badge.default, style.badge[size], style[colorMode][variant], sx) }}
		>
			<HStack width='100%' spacing={handleReturnSpacing()}>
				{renderLeft
					? renderLeft({ color, colorMode, height: iconHeightSize, size, fontSize: theme.fontSizes[size] })
					: null}
				<SkeletonText
					as={Center}
					colorMode={colorMode}
					width={isLoading ? `${dummy}px` : 'auto'}
					height={
						isLoading
							? `${
									handleConvertREMToPixels(
										handleConvertStringToNumber(theme.fontSizes[size], 'rem')
									) - 4
							  }px`
							: 'auto'
					}
					color={color}
					fontSize={size}
					isLoaded={!isLoading}
				>
					{children}
				</SkeletonText>
				{renderRight
					? renderRight({ color, colorMode, height: iconHeightSize, size, fontSize: theme.fontSizes[size] })
					: null}
			</HStack>
		</CUIBadge>
	);
};

export default Badge;
