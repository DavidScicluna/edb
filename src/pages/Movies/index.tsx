import { ReactElement, useState, useEffect } from 'react';

import { HStack, ScaleFade, useMediaQuery, VStack } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import qs from 'query-string';
import { useInfiniteQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import axiosInstance from '../../common/scripts/axios';
import { Response } from '../../common/types';
import { PartialMovie } from '../../common/types/movie';
import Button from '../../components/Clickable/Button';
import DisplayMode from '../../components/Clickable/DisplayMode';
import LoadMore from '../../components/Clickable/LoadMore';
import Filters from '../../components/Filters';
import { Form as FiltersForm } from '../../components/Filters/types';
import SortBy from '../../components/SortBy';
import { movieSortBy as sortBy } from '../../components/SortBy/common/data/sort';
import { Form as SortForm } from '../../components/SortBy/types';
import Page from '../../containers/Page';
import VerticalMovies from './components/Orientation/Vertical';

const defaultFilters = {
  'language': 'en-US', // TODO: Make this dynamic
  'ott_region': 'US', // TODO: Make this dynamic
  'certification_country': 'US', // TODO: Make this dynamic
  'primary_release_date.lte': moment().subtract(1, 'months').format('YYYY-MM-DD'),
  'vote_average.gte': '0',
  'vote_average.lte': '10',
  'vote_count.gte': '300',
  'with_runtime.gte': '0',
  'with_runtime.lte': '450'
};

const Movies = (): ReactElement => {
  const source = axios.CancelToken.source();

  const [isSm] = useMediaQuery('(max-width: 600px)');

  const history = useHistory();

  const [movies, setMovies] = useState<Response<PartialMovie[]>>();

  // Fetching  movies
  const moviesQuery = useInfiniteQuery(
    'movies',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/discover/movie', {
        params: {
          page: pageParam,
          ...(qs.parse(history.location.search || '') || {})
        },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: false,
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
        return;
      }
    }
  );

  const handleSetFilters = (form: FiltersForm): void => {
    const currentSearch = qs.parse(history.location.search);
    Object.keys(currentSearch).forEach((key) => key === 'sort_by' || delete currentSearch[key]);

    const filters = _.omitBy(
      _.merge({
        ...defaultFilters,
        'certification': form.certifications.length > 0 ? form.certifications.join('|') : undefined,
        'include_adult': form.adult ? String(form.adult) : undefined,
        'primary_release_date.gte': form.date.length > 0 && form.date[0] ? form.date[0] : undefined,
        'primary_release_date.lte': form.date.length > 0 && form.date[1] ? form.date[1] : undefined,
        'with_genres': form.genres.length > 0 ? form.genres.join(',') : undefined,
        'vote_average.gte': form.rating.length > 0 && form.rating[0] ? form.rating[0] : undefined,
        'vote_average.lte': form.rating.length > 0 && form.rating[1] ? form.rating[1] : undefined,
        'vote_count.gte': form.count.length > 0 && form.count[0] ? form.count[0] : undefined,
        'vote_count.lte': form.count.length > 0 && form.count[1] ? form.count[1] : undefined,
        'with_runtime.gte': form.runtime.length > 0 && form.runtime[0] ? form.runtime[0] : undefined,
        'with_runtime.lte': form.runtime.length > 0 && form.runtime[1] ? form.runtime[1] : undefined
      }),
      _.isNil
    );

    history.push({
      location: '/movies',
      search: qs.stringify({ ..._.mergeWith(currentSearch, filters) })
    });

    setTimeout(() => moviesQuery.refetch(), 250);
  };

  const handleSetSortBy = (form: SortForm): void => {
    const currentSearch = _.omit(qs.parse(history.location.search), 'sort_by');

    const sortBy = {
      sort_by: `${form.sortBy.value}.${form.direction}`
    };

    history.push({
      location: '/movies',
      search: qs.stringify({ ..._.mergeWith(currentSearch, sortBy) })
    });

    setTimeout(() => moviesQuery.refetch(), 250);
  };

  useEffect(() => {
    const currentSearch = qs.parse(history.location.search);

    history.push({
      location: '/movies',
      search: qs.stringify(
        Object.keys(currentSearch).length > 0
          ? _.merge({ ...defaultFilters, ...currentSearch })
          : _.merge({ ...defaultFilters, sort_by: 'popularity.desc' })
      )
    });

    setTimeout(() => moviesQuery.refetch(), 250);

    return () => source.cancel();
  }, []);

  return (
    <Page title='Movies'>
      {{
        actions: (
          <HStack width={isSm ? '100%' : 'auto'} spacing={2}>
            <SortBy
              renderButton={({ color, onClick }) => (
                <Button
                  color={color}
                  isFullWidth={isSm}
                  isDisabled={moviesQuery.isFetching || moviesQuery.isLoading || moviesQuery.isError}
                  onClick={onClick}
                  variant='outlined'
                  sx={{ back: { height: '38px' } }}
                >
                  Sort By
                </Button>
              )}
              sortBy={[...sortBy]}
              onSort={handleSetSortBy}
            />
            <Filters
              renderButton={({ color, onClick }) => (
                <Button
                  color={color}
                  isFullWidth={isSm}
                  isDisabled={moviesQuery.isFetching || moviesQuery.isLoading || moviesQuery.isError}
                  onClick={onClick}
                  variant='outlined'
                  sx={{ back: { height: '38px' } }}
                >
                  Filter
                </Button>
              )}
              mediaType='movie'
              onFilter={handleSetFilters}
            />
            <DisplayMode />
          </HStack>
        ),
        body: (
          <VStack width='100%' spacing={4} px={2} pt={2}>
            <VerticalMovies
              isError={moviesQuery.isError}
              isSuccess={moviesQuery.isSuccess}
              isLoading={moviesQuery.isFetching || moviesQuery.isLoading}
              movies={movies?.results || []}
            />

            <ScaleFade in={!moviesQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
              <LoadMore
                amount={movies?.results.length || 0}
                total={movies?.total_results || 0}
                label='Movies'
                isLoading={moviesQuery.isFetching || moviesQuery.isLoading}
                isButtonVisible={(moviesQuery.hasNextPage || true) && !moviesQuery.isError}
                onClick={moviesQuery.fetchNextPage}
              />
            </ScaleFade>
          </VStack>
        )
      }}
    </Page>
  );
};

export default Movies;
