import { ReactElement } from 'react';

import { useLocation } from 'react-router-dom';

import { useTheme, IconButton, Icon } from '@davidscicluna/component-library';

import { useColorMode, HStack, Fade } from '@chakra-ui/react';

import Link from '../../../../components/Clickable/Link';
import useTransitionsStyle from '../../common/styles/transitions';

import User from './components/User';
import Menu from './components/Menu';

const Header = (): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const location = useLocation();

	const transition = useTransitionsStyle(theme);

	return (
		<HStack
			width='100%'
			position='sticky'
			top={0}
			zIndex={800}
			justifyContent='space-between'
			backgroundColor={`gray.${colorMode === 'light' ? 50 : 900}`}
			borderBottom='solid2'
			borderBottomColor={`gray.${colorMode === 'light' ? 200 : 700}`}
			px={2}
			py={1}
			sx={{ ...transition }}
		>
			<Menu />

			<HStack>
				<Fade in={location.pathname !== '/search'} unmountOnExit>
					<Link to={{ pathname: '/search' }}>
						<IconButton aria-label='Open Menu' size='lg' variant='icon'>
							<Icon icon='search' category='outlined' />
						</IconButton>
					</Link>
				</Fade>
				<User />
			</HStack>
		</HStack>
	);
};

export default Header;
