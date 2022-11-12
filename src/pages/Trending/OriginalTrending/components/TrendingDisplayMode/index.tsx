import { FC } from 'react';

import { useTheme, Divider, utils } from '@davidscicluna/component-library';

import { HStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../common/hooks';
import { DisplayMode } from '../../../../../components';

const { getColor } = utils;

const TrendingDisplayMode: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [displayModeRef, { height: displayModeHeight }] = useElementSize();

	return (
		<HStack spacing={0}>
			<Divider height={`${displayModeHeight / 1.5}px`} colorMode={colorMode} orientation='vertical' mx={1.5} />

			<Center ref={displayModeRef}>
				<DisplayMode
					separator={
						<Center height='100%'>
							<Text
								align='center'
								color={getColor({ theme, colorMode, type: 'text.secondary' })}
								fontSize='lg'
							>
								/
							</Text>
						</Center>
					}
					size='sm'
					variant='icon'
				/>
			</Center>
		</HStack>
	);
};

export default TrendingDisplayMode;
