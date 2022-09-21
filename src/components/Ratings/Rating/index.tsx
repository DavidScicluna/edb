import { FC, useState } from 'react';

import { useTheme, Skeleton, Icon, utils } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { round } from 'lodash';
import numbro from 'numbro';
import { useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../common/hooks';
import { getFontSizeHeight } from '../../../common/utils';

import { RatingProps } from './types';

const { getColor } = utils;

const Rating: FC<RatingProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { rating, count, inView = true, isLoading = false, spacing = 0.5, size = 'md', ...rest } = props;

	const [iconSize, setIconSize] = useState<string>(
		`${getFontSizeHeight({ theme, fontSize: size, lineHeight: 'base' })}px`
	);

	useUpdateEffect(() => setIconSize(`${getFontSizeHeight({ theme, fontSize: size, lineHeight: 'base' })}px`), [size]);

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

			<Skeleton isLoaded={inView && !isLoading} variant='text'>
				<HStack
					divider={
						count ? (
							<Text
								align='left'
								fontSize={size}
								color={getColor({ theme, colorMode, type: 'text.secondary' })}
								noOfLines={1}
								mx={0.75}
							>
								|
							</Text>
						) : undefined
					}
					spacing={spacing}
				>
					<Text
						align='left'
						fontSize={size}
						fontWeight='semibold'
						color={getColor({ theme, colorMode, type: 'text.primary' })}
						noOfLines={1}
					>
						{rating && !isLoading ? round(Number(rating), 1) : 'N/A'}
					</Text>

					{count && (
						<Text
							align='left'
							fontSize='xs'
							color={getColor({ theme, colorMode, type: 'text.secondary' })}
							noOfLines={1}
						>
							{numbro(count).format({ average: true })}
						</Text>
					)}
				</HStack>
			</Skeleton>
		</HStack>
	);
};

export default Rating;
