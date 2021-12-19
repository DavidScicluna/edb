import { ReactElement, useEffect, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';

import { useSelector } from '../../../../common/hooks';
import axiosInstance from '../../../../common/scripts/axios';
import { PartialMovie } from '../../../../common/types/movie';
import { Response, SortBy, Genre } from '../../../../common/types/types';
import LoadMore from '../../../../components/Clickable/LoadMore';
import Filters from '../../../../components/Filters';
import VerticalGrid from '../../../../components/Grid/Vertical';
import Page from '../../../../containers/Page';
import { home, movies as moviesBreadcrumb } from '../../../../containers/Page/common/data/breadcrumbs';
import VerticalMovies from '../../components/VerticalMovies';

const TopRatedMovies = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [sortBy, setSortBy] = useState<SortBy | undefined>();
  const [genres, setGenres] = useState<Genre[]>([]);

  const [movies, setMovies] = useState<Response<PartialMovie[]>>();

  // Fetching top rated movies
  const topRatedMoviesQuery = useInfiniteQuery(
    'topRatedMovies',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/movie/top_rated', {
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

    topRatedMoviesQuery.refetch();
  };

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <Page
      title='Top Rated Movies'
      breadcrumbs={[home, moviesBreadcrumb, { label: 'Top Rated', to: { pathname: '/movies/top-rated' } }]}
    >
      {{
        actions: <Filters mediaType='movie' isDisabled={!topRatedMoviesQuery.isSuccess} onFilter={handleSetFilters} />,
        body: (
          <VerticalGrid>
            <VStack width='100%' spacing={4} px={2} pt={2}>
              <VerticalMovies
                isError={topRatedMoviesQuery.isError}
                isSuccess={topRatedMoviesQuery.isSuccess}
                isLoading={topRatedMoviesQuery.isFetching || topRatedMoviesQuery.isLoading}
                movies={movies?.results || []}
              />

              <ScaleFade in={!topRatedMoviesQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
                <LoadMore
                  amount={movies?.results.length || 0}
                  total={movies?.total_results || 0}
                  label='Movies'
                  isLoading={topRatedMoviesQuery.isFetching || topRatedMoviesQuery.isLoading}
                  isButtonVisible={(topRatedMoviesQuery.hasNextPage || true) && !topRatedMoviesQuery.isError}
                  onClick={topRatedMoviesQuery.fetchNextPage}
                />
              </ScaleFade>
            </VStack>
          </VerticalGrid>
        )
      }}
    </Page>
  );
};

export default TopRatedMovies;
