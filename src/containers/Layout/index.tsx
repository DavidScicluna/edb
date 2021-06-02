import React, { ReactElement, useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import useQueriesTyped from '../../common/hooks/useQueriesTyped';
import axiosInstance from '../../common/scripts/axios';
import { Genre } from '../../common/types/types';
import { setMovieGenres, setTVGenres, toggleHasDownloaded } from '../../store/slices/options';

interface GenreResponse {
  genres: Genre[];
}

const Layout = ({ children }: { children: ReactElement }): ReactElement => {
  const dispatch = useDispatch();

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

  return <Box overflow='hidden'>{children}</Box>;
};

export default Layout;
