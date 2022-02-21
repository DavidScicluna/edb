import { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ColorMode, useTheme, useColorMode, useMediaQuery, Container, HStack, VStack, Box } from '@chakra-ui/react';

import {
	HomeTwoTone as HomeTwoToneIcon,
	HomeOutlined as HomeOutlinedIcon,
	PeopleAltOutlined as PeopleAltOutlinedIcon,
	PeopleAltTwoTone as PeopleAltTwoToneIcon,
	SearchOutlined as SearchOutlinedIcon,
	SearchTwoTone as SearchTwoToneIcon,
	TheatersOutlined as TheatersOutlinedIcon,
	TheatersTwoTone as TheatersTwoToneIcon,
	TvOutlined as TvOutlinedIcon,
	TvTwoTone as TvTwoToneIcon,
	WhatshotOutlined as WhatshotOutlinedIcon,
	WhatshotTwoTone as WhatshotTwoToneIcon
} from '@material-ui/icons';
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
import Routes from './components/Routes';
import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';

import { useSelector, usePopulateOptions, useCheckColorMode } from '../../common/hooks';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../common/utils';
import { NavItem } from '../../components/NavItem/types';
import { toggleSidebarMode } from '../../store/slices/App';
import { toggleSplashscreen } from '../../store/slices/Modals';
import { Theme } from '../../theme/types';

export const navItems: NavItem[] = [
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <HomeTwoToneIcon style={{ fontSize }} /> : <HomeOutlinedIcon style={{ fontSize }} />,
		label: 'Home',
		path: '/'
	},
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <SearchTwoToneIcon style={{ fontSize }} /> : <SearchOutlinedIcon style={{ fontSize }} />,
		label: 'Search',
		path: '/search'
	},
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <WhatshotTwoToneIcon style={{ fontSize }} /> : <WhatshotOutlinedIcon style={{ fontSize }} />,
		label: 'Trending',
		path: '/trending'
	},
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <TheatersTwoToneIcon style={{ fontSize }} /> : <TheatersOutlinedIcon style={{ fontSize }} />,
		label: 'Movies',
		path: '/movies'
	},
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <TvTwoToneIcon style={{ fontSize }} /> : <TvOutlinedIcon style={{ fontSize }} />,
		label: 'TV Shows',
		path: '/tvshows'
	},
	{
		renderIcon: ({ isActive, fontSize }) =>
			isActive ? <PeopleAltTwoToneIcon style={{ fontSize }} /> : <PeopleAltOutlinedIcon style={{ fontSize }} />,
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

	const mode = useCheckColorMode(!isFirstRender && background === 'system');

	const handleUpdateColorMode = useCallback(
		_.debounce((mode: ColorMode) => {
			dispatch(toggleSplashscreen(true));

			setColorMode(mode);

			setTimeout(() => dispatch(toggleSplashscreen(false)), 5000);
		}, 500),
		[dispatch, toggleSplashscreen, setColorMode]
	);

	usePopulateOptions();

	useEffect(() => {
		if (!isLgUp) {
			dispatch(toggleSidebarMode('expanded'));
		}
	}, [isLgUp]);

	useUpdateEffect(() => {
		if (!isFirstRender) {
			handleUpdateColorMode(mode);
		}
	}, [mode]);

	return (
		<>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
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
			</BrowserRouter>
		</>
	);
};

export default Layout;