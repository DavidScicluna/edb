import React, { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, HStack, Box, VStack } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import axiosInstance from '../../../../common/scripts/axios';
import { MediaType, Response } from '../../../../common/types';
import { PartialMovie } from '../../../../common/types/movie';
import Button from '../../../../components/Clickable/Button';
import DisplayMode from '../../../../components/Clickable/DisplayMode';
import LoadMore from '../../../../components/Clickable/LoadMore';
import MediaTypePicker from '../../../../components/MediaTypePicker';
import Page from '../../../../containers/Page';
import VerticalMovies from '../../../Movies/components/VerticalMovies';

const Movies = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');

  const history = useHistory();

  const [movies, setMovies] = useState<Response<PartialMovie[]>>();

  // Fetching trending movies
  const trendingMoviesQuery = useInfiniteQuery(
    'trending-movies',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/trending/movie/day', {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        let movies: PartialMovie[] = [];

        data.pages.forEach((page) => {
          movies = [...movies, ...page.results];
        });

        setMovies({
          page: data.pages[data.pages.length - 1].page,
          results: [..._.uniqBy(movies, 'id')],
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });
      }
    }
  );

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page title='Trending Movies'>
      {{
        actions: (
          <HStack spacing={2}>
            <MediaTypePicker
              renderToggleModal={({ color, label, icon, onClick }) => (
                <Button color={color} isFullWidth={isSm} onClick={() => onClick()} variant='outlined'>
                  {label}
                </Button>
              )}
              mediaType='movie'
              onSetType={(mediaType: MediaType) => history.push({ pathname: `/trending/${mediaType}` })}
            />
            <DisplayMode />
          </HStack>
        ),
        body: (
          <VStack width='100%' spacing={4} px={2} pt={2}>
            <VerticalMovies
              isError={trendingMoviesQuery.isError}
              isSuccess={trendingMoviesQuery.isSuccess}
              isLoading={trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading}
              movies={movies?.results || []}
            />

            <Box style={{ width: isSm ? '100%' : 'auto' }}>
              <LoadMore
                amount={movies?.results.length || 0}
                total={movies?.total_results || 0}
                label='Trending Movies'
                isLoading={trendingMoviesQuery.isFetching || trendingMoviesQuery.isLoading}
                isButtonVisible={trendingMoviesQuery.hasNextPage && !trendingMoviesQuery.isError}
                onClick={() => trendingMoviesQuery.fetchNextPage()}
              />
            </Box>
          </VStack>
        )
      }}
    </Page>
  );
};

export default Movies;
