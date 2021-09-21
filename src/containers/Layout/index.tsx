import { ReactElement, useState, useEffect } from 'react';

import { useTheme, useMediaQuery, Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { useSelector } from '../../common/hooks';
import useQueriesTyped from '../../common/hooks/useQueriesTyped';
import axiosInstance from '../../common/scripts/axios';
import { toggleSidebarMode } from '../../store/slices/App';
import { setMovieGenres, setTVGenres, toggleHasDownloaded } from '../../store/slices/Options';
import { Theme } from '../../theme/types';
import { sidebarWidth, headerHeight } from './common/data/dimensions';
import useTransitionsStyle from './common/styles/transitions';
import Footer from './components/Footer';
import Header from './components/Header';
import ConfirmModal from './components/Modals/Confirm';
import DescriptionModal from './components/Modals/Description';
import DisplayModal from './components/Modals/Display';
import ListsModal from './components/Modals/Lists';
import QuickView from './components/Modals/QuickView';
import SplashscreenModal from './components/Modals/Splashscreen';
import Routes from './components/Routes';
import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';
import { GenreResponse } from './types';

const Layout = (): ReactElement => {
  const theme = useTheme<Theme>();
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);
  const transition = useTransitionsStyle(theme);

  const dispatch = useDispatch();
  const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

  const isSplashscreenOpen = useSelector((state) => state.modals.ui.isSplashscreenOpen);

  const [width, setWidth] = useState<string>('100%');
  const [left, setLeft] = useState<string>(`${sidebarWidth[sidebarMode]}px`);

  const queries = useQueriesTyped([
    {
      queryKey: ['movieGenres'],
      queryFn: async () => {
        const { data } = await axiosInstance.get<GenreResponse>('/genre/movie/list');
        return data;
      }
    },
    {
      queryKey: 'tvGenres',
      queryFn: async () => {
        const { data } = await axiosInstance.get<GenreResponse>('/genre/tv/list');
        return data;
      }
    }
  ]);

  // Saving Movie genres data to redux store
  useEffect(() => {
    if (queries[0].isSuccess) {
      dispatch(setMovieGenres(queries[0].data.genres));
    }
  }, [queries[0]]);

  // Saving TV genres data to redux store
  useEffect(() => {
    if (queries[1].isSuccess) {
      dispatch(setTVGenres(queries[1].data.genres));
    }
  }, [queries[1]]);

  useEffect(() => {
    if (queries.some((query) => query.isError || query.isLoading)) {
      dispatch(toggleHasDownloaded(false));
    } else {
      dispatch(toggleHasDownloaded(true));
    }
  }, [queries]);

  useEffect(() => {
    setWidth(isLgUp ? `calc(100% - ${sidebarWidth[sidebarMode]}px)` : '100%');
    setLeft(isLgUp ? `${sidebarWidth[sidebarMode]}px` : '0px');
  }, [isLgUp, sidebarMode]);

  useEffect(() => {
    if (!isLgUp) {
      dispatch(toggleSidebarMode('expanded'));
    }
  }, [isLgUp]);

  return isSplashscreenOpen ? (
    <SplashscreenModal />
  ) : (
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
          sx={{ ...transition }}>
          <Box width='100%' minHeight={`calc(100vh - ${headerHeight + 32}px)`} sx={{ ...transition }}>
            <Routes />
          </Box>

          <Footer />
        </Box>

        <ScrollToTop />
      </Box>

      <ConfirmModal />

      <QuickView />

      <DisplayModal />

      <ListsModal />

      <DescriptionModal />
    </BrowserRouter>
  );
};

export default Layout;
