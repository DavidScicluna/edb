import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import Logo from '../Logo';

const { getColor } = utils;

const Header: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	return (
		<VStack width='100%' spacing={2}>
			<Logo />

			<VStack width='100%' spacing={0}>
				<Text
					align='center'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize={['4xl', '4xl', '6xl', '6xl']}
					lineHeight='base'
					whiteSpace='nowrap'
				>
					Hello there!
				</Text>
				<Text
					align='center'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					fontSize={['xs', 'xs', 'sm', 'sm']}
				>
					Welcome to The Entertainment Database application or EDB for short. The one-stop app for all things
					Movies, TV Shows, and the people that make it happen!
				</Text>
			</VStack>
		</VStack>
	);
};

export default Header;
