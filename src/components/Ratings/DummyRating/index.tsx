import { FC } from 'react';

import { useTheme, Skeleton, Icon, utils } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../common/hooks';

import { DummyRatingProps } from './types';

const { getColor } = utils;

const DummyRating: FC<DummyRatingProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { hasCount = false, spacing = 0.75, size = 'md', ...rest } = props;

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

			<Skeleton isLoaded={false} variant='text'>
				<HStack
					divider={
						hasCount ? (
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
						N/A
					</Text>

					{hasCount && (
						<Text
							align='left'
							fontSize='xs'
							color={getColor({ theme, colorMode, type: 'text.secondary' })}
							noOfLines={1}
						>
							N/A
						</Text>
					)}
				</HStack>
			</Skeleton>
		</HStack>
	);
};

export default DummyRating;
