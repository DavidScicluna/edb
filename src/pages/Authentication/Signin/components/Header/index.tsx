import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { compact } from 'lodash';
import { useWindowSize } from 'usehooks-ts';

import { useSelector, useUserTheme } from '../../../../../common/hooks';
import Logo from '../Logo';

const { getColor } = utils;

const Header: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { height: windowHeight } = useWindowSize();

	const users = useSelector((state) => state.users.data.users.length);

	return (
		<VStack width='100%' spacing={2}>
			<Logo />

			<VStack width='100%' spacing={0}>
				<Text
					align='center'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize={['3xl', '4xl', '5xl', '6xl']}
					lineHeight='base'
					whiteSpace='nowrap'
				>
					Hello there!
				</Text>
				<Text
					align='center'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					fontSize={['xs', 'xs', 'xs', 'sm']}
				>
					{compact([
						'Welcome to The Entertainment Database application or EDB for short.',
						users === 0 || windowHeight > 960
							? 'The one-stop app for all things Movies, TV Shows, and the people that make it happen!'
							: null
					]).join(' ')}
				</Text>
			</VStack>
		</VStack>
	);
};

export default Header;
