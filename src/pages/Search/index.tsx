import React, { ReactElement, useState, useCallback, useEffect } from 'react';

import { useDisclosure, useMediaQuery, useBoolean, VStack, HStack, Box, ScaleFade, SlideFade } from '@chakra-ui/react';
import sort from 'array-sort';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import queryString from 'query-string';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Department } from '../../common/data/departments';
import { useSelector } from '../../common/hooks';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { MediaType, Response, SortBy, Genre } from '../../common/types/types';
import Button from '../../components/Clickable/Button';
import Filters from '../../components/Filters';
import VerticalGrid from '../../components/Grid/Vertical';
import LoadMore from '../../components/LoadMore';
import MediaTypePicker from '../../components/MediaTypePicker';
import VerticalMovies from '../../components/Movies/Grid/Vertical';
import VerticalPeople from '../../components/People/Grid/Vertical';
import VerticalTV from '../../components/TV/Grid/Vertical';
import Page from '../../containers/Page';
import { home, search } from '../../containers/Page/common/data/breadcrumbs';
import { Breadcrumb } from '../../containers/Page/types';
import { setRecentSearches } from '../../store/slices/User';
import All from './components/All';
import Form from './components/Form';
import { Keyword, InputKeyboardEvent, InputChangeEvent, TotalResults } from './types';

const Search = (): ReactElement => {
  const source = axios.CancelToken.source();

  const {
    isOpen: isMediaTypePickerOpen,
    onOpen: onMediaTypePickerOpen,
    onClose: onMediaTypePickerClose
  } = useDisclosure();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const history = useHistory();

  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.user.data.recentSearches);
  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const [query, setQuery] = useState<string>('');
  const [submittedQuery, setSubmittedQuery] = useState<string>('');

  const [mediaType, setMediaType] = useState<MediaType>();

  const [sortBy, setSortBy] = useState<SortBy>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [movies, setMovies] = useState<Response<PartialMovie[]> | null>(null);
  const [tv, setTV] = useState<Response<PartialTV[]> | null>(null);
  const [people, setPeople] = useState<Response<PartialPerson[]> | null>(null);

  const [hasUnsubmitted, setHasUnsubmitted] = useBoolean();

  const [totalResults, setTotalResults] = useState<TotalResults>();

  // Fetching keywords
  const keywords = useQuery(
    ['keywords', query],
    async () => {
      const { data } = await axiosInstance.get<Response<Keyword[]>>('/search/keyword', {
        params: { query },
        cancelToken: source.token
      });
      return data.results;
    },
    { enabled: query.length > 0 }
  );

  // Searching movies by query
  const searchMovies = useInfiniteQuery(
    ['searchMovies', submittedQuery],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/search/movie', {
        params: {
          query: query || queryString.parse(location.search)?.query || '',
          page: pageParam || queryString.parse(location.search)?.page || 1
        },

        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (!mediaType ? true : mediaType === 'movie') && submittedQuery.length > 0,
      cacheTime: 0,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        const current = data.pages[data.pages.length - 1];
        let movies: PartialMovie[] = [];

        data.pages.forEach((page) => {
          movies = [...movies, ...page.results];
        });

        if (current) {
          setMovies({
            ...current,
            results: sort(
              genres && genres.length > 0
                ? movies.filter((movie) => genres.some((genre) => _.includes(movie.genre_ids, genre.id)))
                : [...movies],
              sortBy?.value || '',
              { reverse: sortDirection === 'desc' }
            )
          });

          setTotalResults({ ...totalResults, movies: current.total_results });
          setSubmittedQuery(query);

          if (data.pages.length === 1 && mediaType === 'movie') {
            dispatch(
              setRecentSearches([
                ...recentSearches,
                {
                  id: uuid(),
                  label: query,
                  date: moment(new Date()).toISOString(),
                  type: 'isKeyword',
                  mediaType: 'movie'
                }
              ])
            );
          }
        }
      }
    }
  );

  // Searching tv shows by query
  const searchTV = useInfiniteQuery(
    ['searchTV', submittedQuery],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialTV[]>>('/search/tv', {
        params: {
          query: query || queryString.parse(location.search)?.query || '',
          page: pageParam || queryString.parse(location.search)?.page || 1
        },

        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (!mediaType ? true : mediaType === 'tv') && submittedQuery.length > 0,
      cacheTime: 0,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        const current = data.pages[data.pages.length - 1];
        let tv: PartialTV[] = [];

        data.pages.forEach((page) => {
          tv = [...tv, ...page.results];
        });

        if (current) {
          setTV({
            ...current,
            results: sort(
              genres && genres.length > 0
                ? tv.filter((show) => genres.some((genre) => _.includes(show.genre_ids, genre.id)))
                : [...tv],
              sortBy?.value || '',
              { reverse: sortDirection === 'desc' }
            )
          });

          setTotalResults({ ...totalResults, tv: current.total_results });
          setSubmittedQuery(query);

          if (data.pages.length === 1 && mediaType === 'tv') {
            dispatch(
              setRecentSearches([
                ...recentSearches,
                {
                  id: uuid(),
                  label: query,
                  date: moment(new Date()).toISOString(),
                  type: 'isKeyword',
                  mediaType: 'tv'
                }
              ])
            );
          }
        }
      }
    }
  );

  // Searching people by query
  const searchPeople = useInfiniteQuery(
    ['searchPeople', submittedQuery],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/search/person', {
        params: {
          query: query || queryString.parse(location.search)?.query || '',
          page: pageParam || queryString.parse(location.search)?.page || 1
        },

        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (!mediaType ? true : mediaType === 'person') && submittedQuery.length > 0,
      cacheTime: 0,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? firstPage.page - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      onSuccess: (data) => {
        const current = data.pages[data.pages.length - 1];
        let people: PartialPerson[] = [];

        data.pages.forEach((page) => {
          people = [...people, ...page.results];
        });

        if (current) {
          setPeople({
            ...current,
            results: sort(
              departments && departments.length > 0
                ? people.filter((person) =>
                    departments.some((department) => person.known_for_department === department.value)
                  )
                : [...people],
              sortBy?.value || '',
              { reverse: sortDirection === 'desc' }
            )
          });

          setTotalResults({ ...totalResults, people: current.total_results });
          setSubmittedQuery(query);

          if (data.pages.length === 1 && mediaType === 'person') {
            dispatch(
              setRecentSearches([
                ...recentSearches,
                {
                  id: uuid(),
                  label: query,
                  date: moment(new Date()).toISOString(),
                  type: 'isKeyword',
                  mediaType: 'person'
                }
              ])
            );
          }
        }
      }
    }
  );

  const handleSetFilters = (sortBy: SortBy[], genres: Genre[], departments: Department[]) => {
    const active = sortBy.find((sort) => sort.isActive);

    if (active) {
      setSortBy(active);
    }

    setGenres(genres);
    setDepartments(departments);

    handleSetLocation(query, mediaType || undefined);
  };

  const handleSetLocation = useCallback(
    (query: string, mediaType?: MediaType, page?: number): void => {
      const search = { query };

      if (mediaType) {
        Object.assign(search, { mediaType });
      }

      if (page) {
        Object.assign(search, { page });
      }

      history.push({
        pathname: '/search',
        search: queryString.stringify({ ...search })
      });
    },
    [history]
  );

  const handleSubmitQuery = useCallback(
    (query: string, mediaType?: MediaType): void => {
      setQuery(query);
      setSubmittedQuery(query);

      setHasUnsubmitted.off();

      searchMovies.remove();
      searchTV.remove();
      searchPeople.remove();

      handleSetLocation(query, mediaType);
    },
    [
      setQuery,
      setSubmittedQuery,
      setHasUnsubmitted,
      searchMovies,
      searchTV,
      searchPeople,
      handleSetLocation,
      setMediaType
    ]
  );

  const handleOnKeyPress = (event: InputKeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleSubmitQuery(query);
    }
  };

  const handleOnChange = (event: InputChangeEvent): void => {
    setQuery(event.target.value);

    setHasUnsubmitted.on();
  };

  const handleClearQuery = (): void => {
    setQuery('');
    setSubmittedQuery('');
    setTotalResults(undefined);
    setMediaType(undefined);

    setHasUnsubmitted.off();
  };

  const handleReturnBreadcrumbs = (): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [home, search];

    if (submittedQuery) {
      breadcrumbs.push({
        label: submittedQuery,
        to: { pathname: '/search', search: queryString.stringify({ query: submittedQuery }) }
      });

      if (mediaType) {
        switch (mediaType) {
          case 'person':
            breadcrumbs.push({
              label: 'People',
              to: {
                pathname: '/search',
                search: queryString.stringify({ query: submittedQuery, mediaType: 'person' })
              }
            });
            break;
          case 'tv':
            breadcrumbs.push({
              label: 'TV Shows',
              to: {
                pathname: '/search',
                search: queryString.stringify({ query: submittedQuery, mediaType: 'tv' })
              }
            });
            break;
          case 'movie':
            breadcrumbs.push({
              label: 'Movies',
              to: {
                pathname: '/search',
                search: queryString.stringify({ query: submittedQuery, mediaType: 'movie' })
              }
            });
            break;
          default:
            break;
        }
      }
    }

    return breadcrumbs;
  };

  useEffect(() => {
    const params = queryString.parse(history.location.search);

    if (params && params.mediaType) {
      switch (params.mediaType) {
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
    } else {
      setMediaType(undefined);
    }

    if (params && params.page && params.mediaType) {
      const page = typeof params.page === 'string' ? params.page : 1;

      if (page > 1) {
        switch (params.mediaType) {
          case 'person':
            searchPeople.fetchNextPage();
            break;
          case 'tv':
            searchTV.fetchNextPage();
            break;
          case 'movie':
            searchMovies.fetchNextPage();
            break;
          default:
            break;
        }
      }
    }

    if (params && params.query && typeof params.query === 'string' && !submittedQuery) {
      handleSubmitQuery(params.query || submittedQuery || query);
    }
  }, [history.location]);

  useEffect(() => {
    if (searchMovies.isSuccess && searchTV.isSuccess && searchPeople.isSuccess && query) {
      setHasUnsubmitted.off();

      setTotalResults({
        movies:
          searchMovies.data && searchMovies.data.pages && searchMovies.data.pages[searchMovies.data.pages.length - 1]
            ? searchMovies.data.pages[searchMovies.data.pages.length - 1].total_results
            : 0,
        tv:
          searchTV.data && searchTV.data.pages && searchTV.data.pages[searchTV.data.pages.length - 1]
            ? searchTV.data.pages[searchTV.data.pages.length - 1].total_results
            : 0,
        people:
          searchPeople.data && searchPeople.data.pages && searchPeople.data.pages[searchPeople.data.pages.length - 1]
            ? searchPeople.data.pages[searchPeople.data.pages.length - 1].total_results
            : 0
      });

      dispatch(
        setRecentSearches([
          ...recentSearches,
          { id: uuid(), label: query, date: moment(new Date()).toISOString(), type: 'isKeyword' }
        ])
      );
    }
  }, [searchMovies.isSuccess && searchTV.isSuccess && searchPeople.isSuccess]);

  useEffect(() => {
    return () => {
      source.cancel();

      handleClearQuery();
    };
  }, []);

  return (
    <>
      <Page title='Search' breadcrumbs={handleReturnBreadcrumbs()}>
        {{
          actions: (
            <ScaleFade in={!!mediaType && !!query} unmountOnExit>
              <HStack spacing={2}>
                <Button onClick={() => onMediaTypePickerOpen()} isFullWidth={isSm} variant='outlined'>
                  Change media-type
                </Button>
                {mediaType ? <Filters mediaType={mediaType} onFilter={handleSetFilters} /> : null}
              </HStack>
            </ScaleFade>
          ),
          body: (
            <VStack width='100%' spacing={0}>
              {/* Search Form */}
              <Form
                keywords={keywords}
                query={query}
                mediaType={mediaType}
                submittedQuery={submittedQuery}
                hasUnsubmitted={hasUnsubmitted}
                totalResults={totalResults}
                isInputDisabled={
                  searchMovies.isFetching ||
                  searchMovies.isLoading ||
                  searchTV.isFetching ||
                  searchTV.isLoading ||
                  searchPeople.isFetching ||
                  searchPeople.isLoading
                }
                onInputKeyPress={handleOnKeyPress}
                onInputChange={handleOnChange}
                onSubmitQuery={handleSubmitQuery}
                onClearQuery={handleClearQuery}
              />

              <Box width='100%'>
                <SlideFade in={!hasUnsubmitted && submittedQuery.length > 0} offsetY={100} unmountOnExit>
                  {mediaType ? (
                    <VerticalGrid>
                      <VStack width='100%' spacing={4} px={2}>
                        {mediaType === 'movie' ? (
                          <VerticalMovies
                            isError={searchMovies.isError}
                            isSuccess={searchMovies.isSuccess}
                            movies={movies?.results || []}
                          />
                        ) : mediaType === 'tv' ? (
                          <VerticalTV
                            isError={searchTV.isError}
                            isSuccess={searchTV.isSuccess}
                            tv={tv?.results || []}
                          />
                        ) : mediaType === 'person' ? (
                          <VerticalPeople
                            isError={searchPeople.isError}
                            isSuccess={searchPeople.isSuccess}
                            people={people?.results || []}
                          />
                        ) : undefined}

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
                          mediaType={`${
                            mediaType === 'movie'
                              ? 'Movies'
                              : mediaType === 'tv'
                              ? 'TV Shows'
                              : mediaType === 'person'
                              ? 'People'
                              : ''
                          } for "${query}"`}
                          isLoading={
                            mediaType === 'movie'
                              ? searchMovies.isFetching || searchMovies.isLoading
                              : mediaType === 'tv'
                              ? searchTV.isFetching || searchTV.isLoading
                              : mediaType === 'person'
                              ? searchPeople.isFetching || searchPeople.isLoading
                              : false
                          }
                          onFetch={() =>
                            handleSetLocation(
                              submittedQuery,
                              mediaType,
                              mediaType === 'movie'
                                ? (movies?.page || 0) + 1
                                : mediaType === 'tv'
                                ? (tv?.page || 0) + 1
                                : mediaType === 'person'
                                ? (people?.page || 0) + 1
                                : 1
                            )
                          }
                        />
                      </VStack>
                    </VerticalGrid>
                  ) : (
                    <All query={submittedQuery} movies={searchMovies} tv={searchTV} people={searchPeople} />
                  )}
                </SlideFade>
              </Box>
            </VStack>
          )
        }}
      </Page>

      <MediaTypePicker
        mediaType={mediaType}
        isOpen={isMediaTypePickerOpen}
        onClose={onMediaTypePickerClose}
        onSetType={(mediaType: MediaType) => handleSetLocation(submittedQuery, mediaType, 1)}
      />
    </>
  );
};

export default Search;
