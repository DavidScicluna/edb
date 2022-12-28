import { FC, useCallback } from 'react';

import { Space, useTheme, utils } from '@davidscicluna/component-library';

import { HStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../../common/hooks';

import { ViewReviewsReviewSubtitleProps } from './types';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

const spacing: Space = 0.75;

const ViewReviewsReviewSubtitle: FC<ViewReviewsReviewSubtitleProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [iconRef, { width: iconWidth }] = useElementSize();
	const [labelRef, { height: labelHeight }] = useElementSize();

	const { renderIcon, renderLabel, ...rest } = props;

	const handleLabelMaxWidth = useCallback(() => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${iconWidth + spacingWidth}px)`;
	}, [theme, iconWidth, spacing]);

	return (
		<HStack {...rest} spacing={spacing}>
			<Center ref={iconRef}>
				{renderIcon({
					width: `${labelHeight}px`,
					height: `${labelHeight}px`,
					fontSize: `${labelHeight}px`,
					colorMode,
					color: getColor({ theme, colorMode, type: 'text.secondary' })
				})}
			</Center>

			<Center ref={labelRef} maxWidth={handleLabelMaxWidth()} alignItems='center' justifyContent='flex-start'>
				{renderLabel({
					align: 'left',
					color: getColor({ theme, colorMode, type: 'text.secondary' }),
					fontSize: ['xs', 'xs', 'sm', 'sm', 'sm', 'sm'],
					lineHeight: 'shorter',
					whiteSpace: 'nowrap'
				})}
			</Center>
		</HStack>
	);
};

export default ViewReviewsReviewSubtitle;
