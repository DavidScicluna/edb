import { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ColorMode, useTheme, useColorMode, useMediaQuery, Container, HStack, VStack, Box } from '@chakra-ui/react';

import _ from 'lodash';
import { useIsFirstRender, useUpdateEffect } from 'usehooks-ts';

import { sidebarWidth, headerHeight } from './common/data/dimensions';
import useTransitionsStyle from './common/styles/transitions';
import Footer from './components/Footer';
import Header from './components/Header';
import DisplayModal from './components/Modals/Display';
import ListsModal from './components/Modals/Lists';
import QuickView from './components/Modals/QuickView';
import SplashscreenModal from './components/Modals/Splashscreen';
import Router from './components/Router';
import Routes from './components/Routes';
import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';

import { useSelector, useCheckIcons, usePopulateOptions, useCheckColorMode } from '../../common/hooks';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../common/utils';
import Icon from '../../components/Icon';
import { NavItem } from '../../components/NavItem/types';
import { toggleSidebarMode } from '../../store/slices/App';
import { toggleSplashscreen } from '../../store/slices/Modals';
import { Theme } from '../../theme/types';

export const navItems: NavItem[] = [
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='home' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Home',
		path: '/'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='search' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Search',
		path: '/search'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='whatshot' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Trending',
		path: '/trending'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='theaters' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Movies',
		path: '/movies'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='tv' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'TV Shows',
		path: '/tvshows'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='people_alt' type={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'People',
		path: '/people'
	}
];

const Layout = (): ReactElement => {
	const theme = useTheme<Theme>();
	const { setColorMode } = useColorMode();

	const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

	const dispatch = useDispatch();
	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);
	const background = useSelector((state) => state.user.ui.theme.background);

	const transition = useTransitionsStyle(theme);

	const isFirstRender = useIsFirstRender();

	const mode = useCheckColorMode();

	const handleUpdateColorMode = useCallback(
		_.debounce((mode: ColorMode) => {
			dispatch(toggleSplashscreen(true));

			setColorMode(mode);

			setTimeout(() => dispatch(toggleSplashscreen(false)), 5000);
		}, 500),
		[dispatch, toggleSplashscreen, setColorMode]
	);

	useCheckIcons();

	usePopulateOptions();

	useEffect(() => {
		if (!isLgUp) {
			dispatch(toggleSidebarMode('expanded'));
		}
	}, [isLgUp]);

	useUpdateEffect(() => {
		if (!isFirstRender && background === 'system') {
			handleUpdateColorMode(mode);
		}
	}, [mode]);

	return (
		<>
			<Router>
				<Container
					width='100%'
					maxWidth={`${
						handleConvertREMToPixels(handleConvertStringToNumber(theme.breakpoints.xl, 'em')) +
						sidebarWidth.expanded
					}px`}
					centerContent
					p={0}
					sx={{ ...transition }}
				>
					<HStack width='100%' position='relative' spacing={0}>
						{isLgUp ? <Sidebar /> : null}
						<Box
							width={isLgUp ? `calc(100% - ${sidebarWidth[sidebarMode]}px)` : '100%'}
							position='absolute'
							top={0}
							left={isLgUp ? `${sidebarWidth[sidebarMode]}px` : '0px'}
							sx={{ ...transition }}
						>
							<Header />

							<VStack width='100%' spacing={4} sx={{ ...transition }}>
								<Box
									width='100%'
									minHeight={`calc(100vh - ${
										headerHeight +
										handleConvertREMToPixels(handleConvertStringToNumber(theme.space[4], 'rem'))
									}px)`}
									sx={{ ...transition }}
								>
									<Routes />
								</Box>

								<Footer />
							</VStack>

							<ScrollToTop />
						</Box>
					</HStack>
				</Container>

				<QuickView />

				<DisplayModal />

				<ListsModal />

				<SplashscreenModal />
			</Router>
		</>
	);
};

export default Layout;
