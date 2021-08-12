import React, { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, VStack } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';

import useSelector from '../../../common/hooks/useSelectorTyped';
import axiosInstance from '../../../common/scripts/axios';
import { PartialMovie } from '../../../common/types/movie';
import { Response, SortBy, Genre } from '../../../common/types/types';
import Filters from '../../../components/Filters';
import VerticalGrid from '../../../components/Grid/Vertical';
import LoadMore from '../../../components/LoadMore';
import VerticalMovies from '../../../components/Movies/Grid/Vertical';

const PopularMovies = (): ReactElement => {
  const source = axios.CancelToken.source();
  const [isSm] = useMediaQuery('(max-width: 480px)');

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [sortBy, setSortBy] = useState<SortBy | undefined>();
  const [genres, setGenres] = useState<Genre[]>([]);

  const [movies, setMovies] = useState<Response<PartialMovie[]>>();

  // Fetching popular movies
  const popularMovies = useInfiniteQuery(
    'popularMovies',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/popular', {
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
          results: sort(
            genres && genres.length > 0
              ? movies.filter((movie) => genres.some((genre) => _.includes(movie.genre_ids, genre.id)))
              : [...movies],
            sortBy?.value || '',
            { reverse: sortDirection === 'desc' }
          ),
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });
        return;
      }
    }
  );

  const handleSetFilters = (sortBy: SortBy[], genres: Genre[]) => {
    const active = sortBy.find((sort) => sort.isActive);

    if (active) {
      setSortBy(active);
    }

    setGenres(genres);

    popularMovies.refetch();
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VerticalGrid
      title={isSm ? 'Popular Movies' : ''}
      header={<Filters mediaType='movie' isDisabled={!popularMovies.isSuccess} onFilter={handleSetFilters} />}>
      <VStack width='100%' spacing={4} px={2}>
        <VerticalMovies
          isError={popularMovies.isError}
          isSuccess={popularMovies.isSuccess && !popularMovies.isFetching && !popularMovies.isLoading}
          movies={movies?.results || []}
        />

        {movies ? (
          <LoadMore
            amount={movies.results.length}
            total={movies.total_results}
            mediaType='movies'
            isLoading={popularMovies.isFetching || popularMovies.isLoading}
            isError={popularMovies.isError}
            hasNextPage={popularMovies.hasNextPage || true}
            onFetch={popularMovies.fetchNextPage}
          />
        ) : null}
      </VStack>
    </VerticalGrid>
  );
};

export default PopularMovies;
