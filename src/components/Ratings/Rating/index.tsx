import { FC } from 'react';

import { useTheme, Skeleton, Icon, utils } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { round } from 'lodash';
import numbro from 'numbro';

import { useUserTheme } from '../../../common/hooks';

import { RatingProps } from './types';

const { getColor } = utils;

const Rating: FC<RatingProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { rating, count, inView = true, isLoading = false, spacing = 0.75, size = 'md', ...rest } = props;

	return (
		<HStack {...rest} spacing={spacing}>
			<Icon
				width={`${theme.fontSizes[size]} * ${theme.lineHeights.base}`}
				height={`${theme.fontSizes[size]} * ${theme.lineHeights.base}`}
				fontSize={`${theme.fontSizes[size]} * ${theme.lineHeights.base}`}
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
