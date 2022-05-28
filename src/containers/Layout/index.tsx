import { ReactElement, useEffect, memo } from 'react';

import { Outlet } from 'react-router-dom';

import { useTheme, Icon } from '@davidscicluna/component-library';

import { useColorMode, useMediaQuery, Container, HStack, VStack, Box, Collapse } from '@chakra-ui/react';
import { useIsFetching, useIsMutating } from 'react-query';
import { useDispatch } from 'react-redux';
import { useTernaryDarkMode, useUpdateEffect } from 'usehooks-ts';

import { useSelector } from '../../common/hooks';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../common/utils';
import { NavItem } from '../../components/NavItem/types';
import { toggleSidebarMode } from '../../store/slices/App';
import { toggleSplashscreen } from '../../store/slices/Modals';
import { defaultUser, getUser } from '../../store/slices/Users';

import { sidebarWidth, headerHeight } from './common/data/dimensions';
import useTransitionsStyle from './common/styles/transitions';
import Footer from './components/Footer';
import Header from './components/Header';
import DisplayModal from './components/Modals/Display';
import ListsModal from './components/Modals/Lists';
import QuickView from './components/Modals/QuickView';
import UserSwitcherModal from './components/Modals/UserSwitcher';
import ProgressBar from './components/ProgressBar';
import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';

export const navItems: NavItem[] = [
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='home' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Home',
		path: '/'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='search' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Search',
		path: '/search'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='whatshot' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Trending',
		path: '/trending'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='theaters' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'Movies',
		path: '/movies'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='tv' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'TV Shows',
		path: '/tvshows'
	},
	{
		renderIcon: ({ isActive, fontSize }) => (
			<Icon icon='people_alt' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		),
		label: 'People',
		path: '/people'
	}
];

const Layout = (): ReactElement => {
	const theme = useTheme();
	const { setColorMode } = useColorMode();

	const [isLg] = useMediaQuery('(min-width: 1280px)');

	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.data.users);
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
		}
	}, [isDarkMode]);

	return (
		<Collapse in unmountOnExit>
			<>
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

				{users.length > 0 ? <UserSwitcherModal /> : null}

				<ListsModal />
			</>
		</Collapse>
	);
};

export default memo(Layout);
