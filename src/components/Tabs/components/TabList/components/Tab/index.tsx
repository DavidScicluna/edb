import { ReactElement } from 'react';

import { useTheme, useColorMode, Tab as CUITab, HStack, Center } from '@chakra-ui/react';

import _ from 'lodash';

import useStyles from './styles';
import { Size, TabsProps, RenderProps } from './types';

import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../../../../common/utils';
import { Space, Theme } from '../../../../../../theme/types';

/**
 * This method will return the appropriate spacing depending on the size passed
 *
 * @returns - number: Spacing value
 */
export const handleReturnSpacing = (size: Size): keyof Space => {
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
export const handleReturnIconSize = (size: Size, theme: Theme): number => {
	switch (size) {
		case 'sm':
			return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.xs, 'rem')) + 2;
		case 'lg':
			return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.md, 'rem')) + 3;
		default:
			return handleConvertREMToPixels(handleConvertStringToNumber(theme.fontSizes.sm, 'rem')) + 2;
	}
};

const Tab = (props: TabsProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const {
		label,
		color = 'gray',
		renderLeft,
		renderRight,
		isDisabled = false,
		isFullWidth = false,
		isOnlyTab = false,
		isSelected: isSelectedProp = false,
		size = 'md'
	} = props;

	const isSelected = isSelectedProp && !isOnlyTab;

	const style = useStyles(theme, { color, isFullWidth, isOnlyTab, isSelected, size });

	const handleReturnRenderProps = (): RenderProps => {
		return {
			width: `${handleReturnIconSize(size, theme)}px`,
			height: `${handleReturnIconSize(size, theme)}px`,
			color,
			isSelected,
			fontSize: `${handleReturnIconSize(size, theme)}px`,
			size: size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'
		};
	};

	return (
		<CUITab
			isDisabled={isDisabled}
			isSelected={isSelected}
			sx={{ ..._.merge(style.tab.default, style.tab[size], style[colorMode]) }}
			_disabled={{ ..._.merge(style.disabled) }}
		>
			<HStack width='100%' alignItems='inherit' justifyContent='inherit' spacing={handleReturnSpacing(size)}>
				{renderLeft ? renderLeft(handleReturnRenderProps()) : null}
				<Center>{label}</Center>
				{renderRight ? renderRight(handleReturnRenderProps()) : null}
			</HStack>
		</CUITab>
	);
};

export default Tab;
