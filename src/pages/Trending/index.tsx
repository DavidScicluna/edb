import React, { ReactElement, useEffect, useState } from 'react';

import { useDisclosure, useMediaQuery, VStack, HStack, Box, Fade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import { useInfiniteQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

import { Department } from '../../common/data/departments';
import { useSelector } from '../../common/hooks';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { MediaType, Response, SortBy, Genre } from '../../common/types/types';
import Button from '../../components/Clickable/Button';
import Empty from '../../components/Empty';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import LoadMore from '../../components/LoadMore';
import MediaTypePicker from '../../components/MediaTypePicker';
import MediaTypes from '../../components/MediaTypePicker/components/MediaTypes';
import Page from '../../containers/Page';
import { home, trending } from '../../containers/Page/common/data/breadcrumbs';
import { Breadcrumb } from '../../containers/Page/types';
import VerticalMovies from '../Movies/components/VerticalMovies';
import VerticalPeople from '../People/components/VerticalPeople';
import VerticalTV from '../TV/components/VerticalTV';

const Trending = (): ReactElement => {
  const source = axios.CancelToken.source();

  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const history = useHistory();
  const { mediaType: paramMediaType } = useParams<{ mediaType: MediaType }>();

  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [mediaType, setMediaType] = useState<MediaType>();

  const [sortBy, setSortBy] = useState<SortBy | undefined>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [movies, setMovies] = useState<Response<PartialMovie[]>>();
  const [tv, setTV] = useState<Response<PartialTV[]>>();
  const [people, setPeople] = useState<Response<PartialPerson[]>>();

  // Fetching trending movies
  const trendingMovies = useInfiniteQuery(
    'trendingMovies',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/trending/movie/day', {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (mediaType && mediaType.length > 0 && mediaType === 'movie') || false,
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
      }
    }
  );

  // Fetching trending tv shows
  const trendingTV = useInfiniteQuery(
    'trendingTV',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialTV[]>>('/trending/tv/day', {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (mediaType && mediaType.length > 0 && mediaType === 'tv') || false,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        let tv: PartialTV[] = [];

        data.pages.forEach((page) => {
          tv = [...tv, ...page.results];
        });

        setTV({
          page: data.pages[data.pages.length - 1].page,
          results: sort(
            genres && genres.length > 0
              ? tv.filter((show) => genres.some((genre) => _.includes(show.genre_ids, genre.id)))
              : [...tv],
            sortBy?.value || '',
            { reverse: sortDirection === 'desc' }
          ),
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });
      }
    }
  );

  // Fetching trending people
  const trendingPeople = useInfiniteQuery(
    'trendingPeople',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/trending/person/day', {
        params: { page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (mediaType && mediaType.length > 0 && mediaType === 'person') || false,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        let people: PartialPerson[] = [];

        data.pages.forEach((page) => {
          people = [...people, ...page.results];
        });

        setPeople({
          page: data.pages[data.pages.length - 1].page,
          results: sort(
            departments && departments.length > 0
              ? people.filter((person) =>
                  departments.some((department) => person.known_for_department === department.value)
                )
              : [...people],
            sortBy?.value || '',
            { reverse: sortDirection === 'desc' }
          ),
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });
      }
    }
  );

  const handleRefetch = (): void => {
    switch (mediaType) {
      case 'movie':
        trendingMovies.refetch();
        break;
      case 'tv':
        trendingTV.refetch();
        break;
      case 'person':
        trendingPeople.refetch();
        break;
      default:
        break;
    }
  };

  const handleSetFilters = (sortBy: SortBy[], genres: Genre[], departments: Department[]): void => {
    const active = sortBy.find((sort) => sort.isActive);

    if (active) {
      setSortBy(active);
    }

    setGenres(genres);
    setDepartments(departments);

    setTimeout(() => handleRefetch(), 0);
  };

  const handleDisabledFilters = (): boolean => {
    switch (mediaType) {
      case 'movie':
        return !trendingMovies.isSuccess;
      case 'tv':
        return !trendingTV.isSuccess;
      case 'person':
        return !trendingPeople.isSuccess;
      default:
        return true;
    }
  };

  const handleResetState = (): void => {
    setMediaType(undefined);
  };

  const handleReturnBreadcrumbs = (): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [home, trending];

    if (mediaType) {
      switch (mediaType) {
        case 'person':
          breadcrumbs.push({
            label: 'People',
            to: { pathname: '/search/person' }
          });
          break;
        case 'tv':
          breadcrumbs.push({
            label: 'TV Shows',
            to: { pathname: '/search/tv' }
          });
          break;
        case 'movie':
          breadcrumbs.push({
            label: 'Movies',
            to: { pathname: '/search/movie' }
          });
          break;
        default:
          break;
      }
    }

    return breadcrumbs;
  };

  useEffect(() => {
    handleResetState();

    if (paramMediaType) {
      handleRefetch();

      switch (paramMediaType) {
        case 'person':
          setMediaType('person');
          break;
        case 'tv':
          setMediaType('tv');
          break;
        case 'movie':
          setMediaType('movie');
          break;
        default:
          break;
      }
    }
  }, [history.location.pathname]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <>
      <Page
        title={
          mediaType
            ? `Trending ${mediaType === 'movie' ? 'Movies' : mediaType === 'person' ? 'People' : 'TV Shows' || ''}`
            : 'Trending'
        }
        breadcrumbs={handleReturnBreadcrumbs()}>
        {{
          actions: (
            <Fade in={!!mediaType} unmountOnExit>
              <HStack spacing={2}>
                <Button onClick={() => onMediaTypePickerOpen()} isFullWidth={isSm} variant='outlined'>
                  Change media-type
                </Button>
                {mediaType ? (
                  <Filters mediaType={mediaType} isDisabled={handleDisabledFilters()} onFilter={handleSetFilters} />
                ) : null}
              </HStack>
            </Fade>
          ),
          body: (
            <VerticalGrid>
              {mediaType ? (
                <VStack width='100%' spacing={4} px={2} pt={2}>
                  {mediaType === 'movie' ? (
                    <VerticalMovies
                      isError={trendingMovies.isError}
                      isSuccess={trendingMovies.isSuccess}
                      isLoading={trendingMovies.isFetching || trendingMovies.isLoading}
                      movies={movies?.results || []}
                    />
                  ) : mediaType === 'tv' ? (
                    <VerticalTV
                      isError={trendingTV.isError}
                      isSuccess={trendingTV.isSuccess}
                      isLoading={trendingTV.isFetching || trendingTV.isLoading}
                      tv={tv?.results || []}
                    />
                  ) : mediaType === 'person' ? (
                    <VerticalPeople
                      isError={trendingPeople.isError}
                      isSuccess={trendingPeople.isSuccess}
                      isLoading={trendingPeople.isFetching || trendingPeople.isLoading}
                      people={people?.results || []}
                    />
                  ) : null}

                  <LoadMore
                    amount={
                      mediaType === 'movie'
                        ? movies?.results.length || 0
                        : mediaType === 'tv'
                        ? tv?.results.length || 0
                        : mediaType === 'person'
                        ? people?.results.length || 0
                        : 0
                    }
                    total={
                      mediaType === 'movie'
                        ? movies?.total_results || 0
                        : mediaType === 'tv'
                        ? tv?.total_results || 0
                        : mediaType === 'person'
                        ? people?.total_results || 0
                        : 0
                    }
                    mediaType={
                      mediaType === 'movie'
                        ? 'Movies'
                        : mediaType === 'tv'
                        ? 'TV Shows'
                        : mediaType === 'person'
                        ? 'People'
                        : ''
                    }
                    isLoading={
                      mediaType === 'movie'
                        ? trendingMovies.isFetching || trendingMovies.isLoading
                        : mediaType === 'tv'
                        ? trendingTV.isFetching || trendingTV.isLoading
                        : mediaType === 'person'
                        ? trendingPeople.isFetching || trendingPeople.isLoading
                        : false
                    }
                    isError={
                      mediaType === 'movie'
                        ? trendingMovies.isError
                        : mediaType === 'tv'
                        ? trendingTV.isError
                        : mediaType === 'person'
                        ? trendingPeople.isError
                        : false
                    }
                    hasNextPage={
                      mediaType === 'movie'
                        ? trendingMovies.hasNextPage
                        : mediaType === 'tv'
                        ? trendingTV.hasNextPage
                        : mediaType === 'person'
                        ? trendingPeople.hasNextPage
                        : true
                    }
                    onFetch={() =>
                      mediaType === 'movie'
                        ? trendingMovies.fetchNextPage
                        : mediaType === 'tv'
                        ? trendingTV.fetchNextPage
                        : mediaType === 'person'
                        ? trendingPeople.fetchNextPage
                        : undefined
                    }
                  />
                </VStack>
              ) : (
                <Box width='100%' px={2} pt={2}>
                  <Empty
                    button={
                      <MediaTypes
                        mediaType={mediaType}
                        onSetType={(mediaType: MediaType) => history.push({ pathname: `/trending/${mediaType}` })}
                      />
                    }
                    hasIllustration={false}
                    label=''
                    size='xl'
                    variant='outlined'
                  />
                </Box>
              )}
            </VerticalGrid>
          )
        }}
      </Page>

      <MediaTypePicker
        mediaType={mediaType}
        isOpen={isMediaTypePickerOpen}
        onClose={onMediaTypePickerClose}
        onSetType={(mediaType: MediaType) => history.push({ pathname: `/trending/${mediaType}` })}
      />
    </>
  );
};

export default Trending;
