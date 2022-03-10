import { ReactElement } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';

import { useColorMode, useMediaQuery, VStack, Stack, Box, Link, Text, useTheme } from '@chakra-ui/react';

import moment from 'moment';

import NavItem from './components/NavItem';

import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import { Theme } from '../../../../theme/types';
import { navItems } from '../../index';

const Footer = (): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	return (
		<VStack width='100%' backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.800'} spacing={4} p={4}>
			<Stack
				width='100%'
				direction={isSm ? 'column' : 'row'}
				alignItems='flex-start'
				justifyContent='space-between'
				spacing={isSm ? 4 : 2}
			>
				{navItems.map((navItem, index) => (
					<NavItem key={index} {...navItem} isDisabled={isFetching > 0 || isMutating > 0} />
				))}
			</Stack>

			<Box width='100%' height='2px' backgroundColor={`gray.${colorMode === 'light' ? 200 : 700}`} />

			<Stack width='100%' direction={isSm ? 'column' : 'row'} justifyContent='space-between'>
				<Text
					align='center'
					color={`gray.${colorMode === 'light' ? 400 : 500}`}
					fontSize='md'
					fontWeight='medium'
				>
					{`© ${moment().format('YYYY')} EDB, All rights reserved.`}
				</Text>

				<Text
					align='center'
					color={`gray.${colorMode === 'light' ? 400 : 500}`}
					fontSize='md'
					fontWeight='medium'
				>
					{'Made by'}{' '}
					<Link
						color={`gray.${colorMode === 'light' ? 400 : 500}`}
						fontWeight='semibold'
						href='https://davidscicluna.com'
						isExternal
						sx={{
							transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
						}}
						_focus={{ boxShadow: 'none', color: `${color}.${colorMode === 'light' ? 600 : 300}` }}
						_hover={{ color: `${color}.${colorMode === 'light' ? 500 : 400}` }}
					>
						davidscicluna.com
					</Link>
				</Text>
			</Stack>
		</VStack>
	);
};

export default Footer;
