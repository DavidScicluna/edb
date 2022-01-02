import { ReactElement, useState, useEffect } from 'react';

import { useTheme, useMediaQuery, Box } from '@chakra-ui/react';
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
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { useSelector } from '../../common/hooks';
import { NavItem } from '../../components/NavItem/types';
import { toggleSidebarMode } from '../../store/slices/App';
import { Theme } from '../../theme/types';
import { sidebarWidth, headerHeight } from './common/data/dimensions';
import useTransitionsStyle from './common/styles/transitions';
import Footer from './components/Footer';
import Header from './components/Header';
import DescriptionModal from './components/Modals/Description';
import DisplayModal from './components/Modals/Display';
import ListsModal from './components/Modals/Lists';
import QuickView from './components/Modals/QuickView';
import SplashscreenModal from './components/Modals/Splashscreen';
import Routes from './components/Routes';
import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';

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
    path: '/tv'
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
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);
  const transition = useTransitionsStyle(theme);

  const dispatch = useDispatch();
  const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

  const [width, setWidth] = useState<string>('100%');
  const [left, setLeft] = useState<string>(`${sidebarWidth[sidebarMode]}px`);

  useEffect(() => {
    setWidth(isLgUp ? `calc(100% - ${sidebarWidth[sidebarMode]}px)` : '100%');
    setLeft(isLgUp ? `${sidebarWidth[sidebarMode]}px` : '0px');
  }, [isLgUp, sidebarMode]);

  useEffect(() => {
    if (!isLgUp) {
      dispatch(toggleSidebarMode('expanded'));
    }
  }, [isLgUp]);

  return (
    <>
      <SplashscreenModal />

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLgUp ? <Sidebar width={`${sidebarWidth[sidebarMode]}px`} /> : null}
        <Box width={width} maxWidth={width} position='absolute' top='0px' left={left} sx={{ ...transition }}>
          <Header width={width} left={left} />

          <Box
            width='100%'
            maxWidth='100%'
            position='relative'
            top={`${headerHeight}px`}
            left='0px'
            sx={{ ...transition }}
          >
            <Box width='100%' minHeight={`calc(100vh - ${headerHeight + 32}px)`} sx={{ ...transition }}>
              <Routes />
            </Box>

            <Footer />
          </Box>

          <ScrollToTop />
        </Box>

        <QuickView />

        <DisplayModal />

        <ListsModal />

        <DescriptionModal />
      </BrowserRouter>
    </>
  );
};

export default Layout;
