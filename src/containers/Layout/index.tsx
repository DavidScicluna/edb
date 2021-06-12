import React, { ReactElement, useState, useEffect } from 'react';

import { useTheme, useMediaQuery, Center, Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import useQueriesTyped from '../../common/hooks/useQueriesTyped';
import axiosInstance from '../../common/scripts/axios';
import { setMovieGenres, setTVGenres, toggleHasDownloaded } from '../../store/slices/options';
import { Theme } from '../../theme/types';
import { navigationWidth } from './common/data/navigation';
import useTransitionsStyle from './common/styles/transitions';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { LayoutProps, GenreResponse } from './types';

const Layout = ({ children, breadcrumbs }: LayoutProps): ReactElement => {
  const theme = useTheme<Theme>();
  const [isLgUp] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);
  const transition = useTransitionsStyle(theme);

  const dispatch = useDispatch();

  const [width, setWidth] = useState<string>('100%');
  const [left, setLeft] = useState<string>('266px');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

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
    setWidth(isLgUp ? `calc(100% - ${navigationWidth[isExpanded ? 'expanded' : 'collapsed']}px)` : '100%');
    setLeft(isLgUp ? `${navigationWidth[isExpanded ? 'expanded' : 'collapsed']}px` : '0px');
  }, [isLgUp, isExpanded]);

  return (
    <Center overflow='hidden'>
      {isLgUp ? (
        <Navigation
          width={`${navigationWidth[isExpanded ? 'expanded' : 'collapsed']}px`}
          isExpanded={isExpanded}
          handleNavigationWidth={() => setIsExpanded(!isExpanded)}
        />
      ) : null}
      <Box width={width} maxWidth={width} position='absolute' top='0px' left={left} sx={{ ...transition }}>
        <Header width={width} left={left} breadcrumbs={breadcrumbs} />
        <Box width='100%' maxWidth='100%' position='relative' top='76px' left='0px' pb={4}>
          {children}
        </Box>
      </Box>
    </Center>
  );
};

export default Layout;
