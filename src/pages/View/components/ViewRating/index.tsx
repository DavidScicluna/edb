import { FC } from 'react';

import { useTheme, Icon, utils } from '@davidscicluna/component-library';

import { HStack, VStack, Text } from '@chakra-ui/react';

import { round } from 'lodash';
import numbro from 'numbro';

import { useUserTheme } from '../../../../common/hooks';

import { ViewRatingProps } from './types';

const { getColor } = utils;

const ViewRating: FC<ViewRatingProps> = ({ rating, count }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<HStack
			borderWidth='2px'
			borderStyle='solid'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='base'
			spacing={0.5}
			p={1}
		>
			<Icon
				width={theme.fontSizes['4xl']}
				height={theme.fontSizes['4xl']}
				fontSize={theme.fontSizes['4xl']}
				color={getColor({ theme, colorMode, color: 'yellow', type: 'color' })}
				colorMode={colorMode}
				icon='star'
				category='outlined'
				skeletonColor='yellow'
			/>

			<VStack alignItems='flex-start' justifyContent='center' flex={1} spacing={0}>
				<HStack spacing={0.5}>
					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.primary' })}
						fontSize='xl'
						fontWeight='semibold'
						lineHeight='normal'
						whiteSpace='nowrap'
					>
						{rating ? (typeof rating === 'number' ? round(rating, 1) : rating) : 'N/A'}
					</Text>

					{rating && (
						<Text
							align='left'
							color={getColor({ theme, colorMode, type: 'text.secondary' })}
							fontSize='xl'
							lineHeight='normal'
							textTransform='uppercase'
							whiteSpace='nowrap'
						>
							/
						</Text>
					)}

					{rating && (
						<Text
							align='left'
							color={getColor({ theme, colorMode, type: 'text.secondary' })}
							fontSize='xl'
							lineHeight='normal'
							textTransform='uppercase'
							whiteSpace='nowrap'
						>
							10
						</Text>
					)}
				</HStack>

				{count && (
					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.secondary' })}
						fontSize='md'
						lineHeight='normal'
						textTransform='uppercase'
						whiteSpace='nowrap'
					>
						{numbro(count).format({ average: true })}
					</Text>
				)}
			</VStack>
		</HStack>
	);
};

export default ViewRating;
