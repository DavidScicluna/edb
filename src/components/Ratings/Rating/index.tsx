import { FC, useState } from 'react';

import { FontSize, useTheme, Icon, utils } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { round } from 'lodash';
import numbro from 'numbro';
import { useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../common/hooks';
import { getIconSize, getCountSize } from '../common/utils';

import { RatingProps } from './types';

const { getColor } = utils;

const Rating: FC<RatingProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { rating, count, spacing = 0.5, size = 'md', ...rest } = props;

	const [iconSize, setIconSize] = useState<string>(getIconSize({ theme, size }));
	const [countSize, setCountSize] = useState<FontSize>(getCountSize({ size }));

	useUpdateEffect(() => setIconSize(getIconSize({ theme, size })), [size]);

	useUpdateEffect(() => setCountSize(getCountSize({ size })), [size]);

	return (
		<HStack {...rest} spacing={spacing}>
			<Icon
				width={iconSize}
				height={iconSize}
				fontSize={iconSize}
				icon='star'
				category='outlined'
				color={getColor({ theme, colorMode, color: 'yellow', type: 'color' })}
			/>

			<HStack
				divider={
					count ? (
						<Text
							align='left'
							color={getColor({ theme, colorMode, type: 'text.secondary' })}
							fontSize={countSize}
							whiteSpace='nowrap'
							mx={0.5}
						>
							|
						</Text>
					) : undefined
				}
				spacing={spacing}
			>
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize={size}
					fontWeight='semibold'
					whiteSpace='nowrap'
				>
					{rating ? (typeof rating === 'number' ? round(rating, 1) : rating) : 'N/A'}
				</Text>

				{count && (
					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.secondary' })}
						fontSize={countSize}
						textTransform='uppercase'
						whiteSpace='nowrap'
					>
						{numbro(count).format({ average: true })}
					</Text>
				)}
			</HStack>
		</HStack>
	);
};

export default Rating;
