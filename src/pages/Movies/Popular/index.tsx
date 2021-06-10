import React, { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, SimpleGrid, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

import useSelector from '../../../common/hooks/useSelectorTyped';
import axiosInstance from '../../../common/scripts/axios';
import { onSortChange } from '../../../common/scripts/sortBy';
import { PartialMovie } from '../../../common/types/movie';
import { Response, SortBy } from '../../../common/types/types';
import utils from '../../../common/utils/utils';
import Empty from '../../../components/Empty';
import Error from '../../../components/Error';
import VerticalGrid from '../../../components/Grid/Vertical';
import LoadMore from '../../../components/LoadMore';
import HorizontalPoster from '../../../components/Poster/Horizontal';
import VerticalPoster from '../../../components/Poster/Vertical';

const defaultSortBy: SortBy[] = [
  {
    label: 'Popularity',
    value: 'popularity',
    isActive: false
  },
  {
    label: 'Rating',
    value: 'vote_average',
    isActive: true
  },
  {
    label: 'Release Date',
    value: 'release_date',
    isActive: false
  },
  {
    label: 'Title',
    value: 'title',
    isActive: false
  }
];

const PopularMovies = (): ReactElement => {
  const source = axios.CancelToken.source();
  const [isSmallMob, isMob] = useMediaQuery(['(max-width: 350px)', '(max-width: 600px)']);

  const hasOptionsDownloaded = useSelector((state) => state.options.data.hasDownloaded);
  const displayMode = useSelector((state) => state.app.data.displayMode);
  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [sortBy, setSortBy] = useState<SortBy[]>(defaultSortBy);

  const [movies, setMovies] = useState<PartialMovie[]>([]);

  const size = utils.handleReturnImageSize('poster', 'sm');

  // Fetching popular movies
  const popularMovies = useInfiniteQuery(
    ['popularMovies', sortBy],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/popular', {
        params: { page: pageParam, sort_by: `${sortBy.find((sort) => sort.isActive)?.value}.${sortDirection}` },
        cancelToken: source.token
      });
      return data;
    },
    {
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false)
    }
  );

  const handleSortChange = (paramSort: SortBy): void => {
    setSortBy(onSortChange(paramSort, sortBy));
  };

  useEffect(() => {
    popularMovies.refetch();
  }, [sortDirection]);

  useEffect(() => {
    if (popularMovies.isSuccess && popularMovies.data && popularMovies.data.pages) {
      let movies: PartialMovie[] = [];

      popularMovies.data.pages.forEach((page) => {
        movies = [...movies, ...page.results];
      });

      setMovies([...movies]);
    }
  }, [popularMovies.dataUpdatedAt]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VerticalGrid title={isMob ? 'Popular Movies' : ''} sortBy={sortBy} onSortChange={handleSortChange}>
      <VStack width='100%' spacing={4}>
        {popularMovies.isLoading || popularMovies.isFetching || !hasOptionsDownloaded ? (
          <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
            {[...Array(movies.length || 20)].map((_dummy, index) =>
              displayMode === 'list' ? (
                <HorizontalPoster
                  key={index}
                  type='movie'
                  image={{
                    alt: 'movie poster',
                    src: '',
                    size
                    // fallback?: ReactElement;
                  }}
                  rating={{
                    rating: null,
                    count: null
                  }}
                  title='Lorem ipsum'
                  subtitle='Lorem ipsum'
                  description='Lorem ipsum'
                  isLoaded={false}
                />
              ) : (
                <VerticalPoster
                  key={index}
                  width='100%'
                  type='movie'
                  image={{
                    alt: 'movie poster',
                    src: '',
                    size
                    // fallback?: ReactElement;
                  }}
                  rating={{
                    rating: null,
                    count: null
                  }}
                  title='Lorem ipsum'
                  subtitle='Lorem ipsum'
                  isLoaded={false}
                />
              )
            )}
          </SimpleGrid>
        ) : popularMovies.isError ? (
          <Error label='Failed to fetch popular movies list!' variant='outlined' />
        ) : popularMovies.isSuccess ? (
          <SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : [isSmallMob ? 1 : 2, 2, 4, 5, 5]} spacing={2}>
            {movies.map((movie: PartialMovie, index) =>
              displayMode === 'list' ? (
                <HorizontalPoster
                  key={index}
                  type='movie'
                  image={{
                    alt: `${movie?.title || ''} movie poster`,
                    src: movie?.poster_path || '',
                    size
                    // fallback?: ReactElement;
                  }}
                  rating={{
                    rating: movie?.vote_average || null,
                    count: movie?.vote_count || null
                  }}
                  title={movie?.title || ''}
                  subtitle={`${utils.handleReturnDate(
                    movie?.release_date || '',
                    'full'
                  )} • ${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
                  description={movie?.overview || ''}
                  isLoaded={true}
                />
              ) : (
                <VerticalPoster
                  key={index}
                  width='100%'
                  type='movie'
                  image={{
                    alt: `${movie?.title || ''} movie poster`,
                    src: movie?.poster_path || '',
                    size
                    // fallback?: ReactElement;
                  }}
                  rating={{
                    rating: movie?.vote_average || null,
                    count: movie?.vote_count || null
                  }}
                  title={movie?.title || ''}
                  subtitle={`${utils.handleReturnDate(
                    movie?.release_date || '',
                    'year'
                  )} • ${utils.handleReturnGenresByID(movie?.genre_ids || [], 'movie')}`}
                  isLoaded={true}
                />
              )
            )}
          </SimpleGrid>
        ) : (
          <Empty label='Popular movies list is empty!' variant='outlined' />
        )}

        {popularMovies.data && popularMovies.data.pages ? (
          <LoadMore
            amount={popularMovies.data.pages[popularMovies.data.pages.length - 1].page * 20}
            total={popularMovies.data.pages[popularMovies.data.pages.length - 1].total_results}
            type='popular movies'
            isLoading={popularMovies.isLoading || popularMovies.isFetching}
            onFetch={popularMovies.fetchNextPage}
          />
        ) : null}
      </VStack>
    </VerticalGrid>
  );
};

export default PopularMovies;
