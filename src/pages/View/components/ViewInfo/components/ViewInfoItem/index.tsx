import { FC, useCallback } from 'react';

import { Space, useTheme, utils } from '@davidscicluna/component-library';

import { Center, HStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../common/hooks';

import { ViewInfoItemProps } from './types';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

const spacing: Space = 1;

const ViewInfoItem: FC<ViewInfoItemProps> = ({ renderIcon, renderLabel, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [iconRef, { width: iconWidth }] = useElementSize();
	const [labelRef, { height: labelHeight }] = useElementSize();

	const handleLabelMaxWidth = useCallback(() => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${renderIcon ? iconWidth + spacingWidth : 0}px)`;
	}, [theme, renderIcon, iconWidth, spacing]);

	return (
		<HStack {...rest} spacing={spacing}>
			{renderIcon && (
				<Center ref={iconRef}>
					{renderIcon({
						width: `${labelHeight}px`,
						height: `${labelHeight}px`,
						fontSize: `${labelHeight}px`,
						colorMode,
						color: getColor({ theme, colorMode, type: 'text.secondary' })
					})}
				</Center>
			)}

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

export default ViewInfoItem;
