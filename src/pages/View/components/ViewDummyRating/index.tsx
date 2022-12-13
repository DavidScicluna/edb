import { FC } from 'react';

import { useTheme, Icon, Skeleton, utils } from '@davidscicluna/component-library';

import { HStack, VStack, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../common/hooks';

const { getColor } = utils;

const ViewDummyRating: FC = () => {
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
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text align='left' fontSize='xl' fontWeight='semibold' lineHeight='normal' whiteSpace='nowrap'>
						## / 10
					</Text>
				</Skeleton>

				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text align='left' fontSize='md' lineHeight='normal' textTransform='uppercase' whiteSpace='nowrap'>
						##
					</Text>
				</Skeleton>
			</VStack>
		</HStack>
	);
};

export default ViewDummyRating;
