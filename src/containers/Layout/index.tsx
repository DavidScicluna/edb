import { ReactElement, useEffect, memo } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import {
	useTheme,
	useColorMode,
	useMediaQuery,
	Container,
	HStack,
	VStack,
	Box,
	Collapse,
	Slide
} from '@chakra-ui/react';

import { useTernaryDarkMode, useUpdateEffect } from 'usehooks-ts';

import { sidebarWidth, headerHeight } from './common/data/dimensions';
import useTransitionsStyle from './common/styles/transitions';
import Footer from './components/Footer';
import Header from './components/Header';
import DisplayModal from './components/Modals/Display';
import ListsModal from './components/Modals/Lists';
import QuickView from './components/Modals/QuickView';
import ProgressBar from './components/ProgressBar';
import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';

import { useSelector } from '../../common/hooks';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../common/utils';
import Icon from '../../components/Icon';
import { NavItem } from '../../components/NavItem/types';
import SplashscreenModal from '../../components/Splashscreen';
import { toggleSidebarMode } from '../../store/slices/App';
import { toggleSplashscreen } from '../../store/slices/Modals';
import { defaultUser, getUser } from '../../store/slices/Users';
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

	const [isLg] = useMediaQuery('(min-width: 1280px)');

	const dispatch = useDispatch();
	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);
	const colorMode = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.ui.theme.colorMode || defaultUser.ui.theme.colorMode
	);
	const isQuickViewOpen = useSelector((state) => state.modals.ui.quickViewModal.open);

	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	const transition = useTransitionsStyle(theme);

	const { isDarkMode } = useTernaryDarkMode();

	useEffect(() => {
		if (!isLg) {
			dispatch(toggleSidebarMode('expanded'));
		}
	}, [isLg]);

	useUpdateEffect(() => {
		if (colorMode === 'system') {
			dispatch(toggleSplashscreen(true));

			setColorMode(isDarkMode ? 'dark' : 'light');

			setTimeout(() => dispatch(toggleSplashscreen(false)), 5000);
		}
	}, [isDarkMode]);

	return (
		<Slide in direction='bottom'>
			<Collapse
				in={!isQuickViewOpen && (isFetching > 0 || isMutating) > 0}
				unmountOnExit
				style={{ position: 'fixed', top: 0, zIndex: 950, width: '100%' }}
			>
				<ProgressBar />
			</Collapse>

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
					{isLg ? <Sidebar /> : null}

					<Box
						width={isLg ? `calc(100% - ${sidebarWidth[sidebarMode]}px)` : '100%'}
						position='absolute'
						top={!isQuickViewOpen && (isFetching > 0 || isMutating) > 0 ? '4px' : 0}
						left={isLg ? `${sidebarWidth[sidebarMode]}px` : '0px'}
						sx={{ ...transition }}
					>
						{!isLg ? <Header /> : null}

						<VStack width='100%' spacing={4} sx={{ ...transition }}>
							<Box
								width='100%'
								minHeight={`calc(100vh - ${
									headerHeight +
									handleConvertREMToPixels(handleConvertStringToNumber(theme.space[4], 'rem'))
								}px)`}
								sx={{ ...transition }}
							>
								<Outlet />
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
		</Slide>
	);
};

export default memo(Layout);
