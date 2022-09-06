import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import Logo from '../Logo';
import { colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';

import { HeaderProps } from './types';

const { getColor } = utils;

const Header: FC<HeaderProps> = ({ colorMode = defaultColorMode }) => {
	const theme = useTheme();

	return (
		<VStack width='100%' spacing={2}>
			<Logo colorMode={colorMode} />

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
