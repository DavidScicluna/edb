import { FC } from 'react';

import { useTheme, Divider, utils } from '@davidscicluna/component-library';

import { HStack, Center, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../common/hooks';
import { DisplayMode } from '../..';

const { getColor } = utils;

const TabDisplayMode: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<HStack alignItems='stretch' justifyContent='stretch' spacing={1} ml={1}>
			<Divider colorMode={colorMode} orientation='vertical' my={0.5} />

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
		</HStack>
	);
};

export default TabDisplayMode;
