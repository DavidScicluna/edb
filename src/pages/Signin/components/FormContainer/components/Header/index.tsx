import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, Text } from '@chakra-ui/react';

import Logo from './components/Logo';

const Header = (): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const [isSmHeight] = useMediaQuery('(min-height: 800px)');
	const [isMdHeight] = useMediaQuery('(min-height: 900px)');

	return (
		<VStack width='100%' spacing={4}>
			<Logo />

			<VStack width='100%' spacing={0.5}>
				<Text align='center' color='gray.900' fontSize='6xl' fontWeight='light' lineHeight='normal'>
					{isSm ? 'Hello!' : 'Hello there!'}
				</Text>
				{isSmHeight ? (
					<Text align='center' color='gray.400' fontSize='sm' lineHeight='normal'>
						Welcome to The <strong>Entertainment Database application or EDB for short 😉</strong>
						{isMdHeight
							? ' . The one-stop app for all things Movies, TV Shows, and the people that make it happen!'
							: null}
					</Text>
				) : null}
			</VStack>
		</VStack>
	);
};

export default Header;
