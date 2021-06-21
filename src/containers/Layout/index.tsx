import React, { ReactElement, useState, useEffect } from 'react';

import { useTheme, useColorMode, useMediaQuery, Center, Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useQueriesTyped from '../../common/hooks/useQueriesTyped';
import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { toggleSidebarMode } from '../../store/slices/App';
import { setMovieGenres, setTVGenres, toggleHasDownloaded } from '../../store/slices/Options';
import { Theme } from '../../theme/types';
import { sidebarWidth } from './common/data/sidebar';
import useTransitionsStyle from './common/styles/transitions';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { LayoutProps, GenreResponse } from './types';

const Layout = ({ children, breadcrumbs }: LayoutProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);
  const transition = useTransitionsStyle(theme);

  const dispatch = useDispatch();
  const sidebarMode = useSelector((state) => state.app.data.sidebarMode);

  const location = useLocation();

  const [width, setWidth] = useState<string>('100%');
  const [left, setLeft] = useState<string>('266px');

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

  const handleBackground = (): string => {
    switch (location.pathname) {
      case '/':
      case '/movies':
      case '/tv':
        return colorMode === 'light' ? 'gray.100' : 'gray.800';
      default:
        return colorMode === 'light' ? 'white' : 'black';
    }
  };

  // Saving Movie genres data to redux store
  useEffect(() => {
    // if (options[0].isError) {
    // } else
    if (queries[0].isSuccess) {
      dispatch(setMovieGenres(queries[0].data.genres));
    }
  }, [queries[0]]);

  // Saving TV genres data to redux store
  useEffect(() => {
    // if (options[1].isError) {
    // } else
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

  return (
    <Center overflow='hidden'>
      {isLgUp ? <Sidebar width={`${sidebarWidth[sidebarMode]}px`} /> : null}
      <Box width={width} maxWidth={width} position='absolute' top='0px' left={left} sx={{ ...transition }}>
        <Header width={width} left={left} breadcrumbs={breadcrumbs} />
        <Box
          width='100%'
          maxWidth='100%'
          position='relative'
          top='76px'
          left='0px'
          backgroundColor={handleBackground()}
          pb={4}>
          {children}
        </Box>
      </Box>
    </Center>
  );
};

export default Layout;
