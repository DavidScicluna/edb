import React, { ReactElement, useState, useEffect } from 'react';

import { useTheme, useMediaQuery, Box, ScaleFade } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import useQueriesTyped from '../../common/hooks/useQueriesTyped';
import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { toggleSidebarMode } from '../../store/slices/App';
import { setMovieGenres, setTVGenres, toggleHasDownloaded } from '../../store/slices/Options';
import { Theme } from '../../theme/types';
import { sidebarWidth } from './common/data/sidebar';
import useTransitionsStyle from './common/styles/transitions';
import Header from './components/Header';
import ConfirmModal from './components/Modals/Confirm';
import DescriptionModal from './components/Modals/Description';
import DisplayModal from './components/Modals/Display';
import ListsModal from './components/Modals/Lists';
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
  const confirmModal = useSelector((state) => state.modals.ui.confirmModal);
  const isDisplayModalOpen = useSelector((state) => state.modals.ui.isDisplayModalOpen);
  const descriptionModal = useSelector((state) => state.modals.ui.descriptionModal);
  const listsModal = useSelector((state) => state.modals.ui.listsModal);

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
    <ScaleFade in={isSplashscreenOpen} unmountOnExit>
      <SplashscreenModal />
    </ScaleFade>
  ) : (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <Container maxWidth='container.xl' overflow='hidden' position='relative'> */}
        {isLgUp ? <Sidebar width={`${sidebarWidth[sidebarMode]}px`} /> : null}
        <Box width={width} maxWidth={width} position='absolute' top='0px' left={left} sx={{ ...transition }}>
          <Header width={width} left={left} />
          <Box width='100%' maxWidth='100%' position='relative' top='66px' left='0px' pb={4} sx={{ ...transition }}>
            <Routes />
          </Box>

          <ScrollToTop />
        </Box>

        {/* </Container> */}
      </BrowserRouter>

      <ScaleFade in={confirmModal.open} unmountOnExit>
        <ConfirmModal />
      </ScaleFade>

      <ScaleFade in={isDisplayModalOpen} unmountOnExit>
        <DisplayModal />
      </ScaleFade>

      <ScaleFade in={listsModal.open} unmountOnExit>
        <ListsModal />
      </ScaleFade>

      <ScaleFade in={descriptionModal.open} unmountOnExit>
        <DescriptionModal />
      </ScaleFade>
    </>
  );
};

export default Layout;
