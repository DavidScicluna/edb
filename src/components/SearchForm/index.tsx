import React, { ReactElement, useRef, useState, useEffect } from 'react';

import {
  useColorMode,
  useOutsideClick,
  VStack,
  Box,
  HStack,
  Input,
  List,
  Icon,
  Collapse,
  ScaleFade
} from '@chakra-ui/react';
import {
  ClearOutlined as ClearOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  LockOpenOutlined as LockOpenOutlinedIcon,
  LockOutlined as LockOutlinedIcon
} from '@material-ui/icons/';
import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import useSelector from '../../common/hooks/useSelectorTyped';
import axiosInstance from '../../common/scripts/axios';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import { Response } from '../../common/types/types';
import { setRecentSearches } from '../../store/slices/User';
import IconButton from '../Inputs/IconButton';
import Tooltip from '../Tooltip';
import Default from './components/Default';
import Display from './components/Display';
import Row from './components/Row';
import { SearchFormProps, Keyword } from './types';

const SearchForm = (props: SearchFormProps): ReactElement => {
  const source = axios.CancelToken.source();
  const { colorMode } = useColorMode();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.user.data.recentSearches);
  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  const history = useHistory();

  const { query, sortBy, onQueryChange, onMoviesChange, onTVChange, onPeopleChange, onIsLoading } = props;

  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isHoveringLock, setIsHoveringLock] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const [localQuery, setLocalQuery] = useState<string>('');
  const [totalResults, setTotalResults] = useState<number | undefined>(undefined);

  // Fetching keywords
  const keywords = useQuery(
    ['keywords', localQuery],
    async () => {
      const { data } = await axiosInstance.get<Response<Keyword[]>>('/search/keyword', {
        params: { query: localQuery },
        cancelToken: source.token
      });
      return data.results;
    },
    { enabled: localQuery.length > 0 }
  );

  const searchMovies = useInfiniteQuery(
    'searchMovies',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/search/movie', {
        params: {
          query: localQuery || query || queryString.parse(location.search)?.query || '',
          page: pageParam || queryString.parse(location.search)?.page || 1,
          sort_by: sortBy ? `${sortBy.find((sort) => sort.isActive)?.value}.${sortDirection}` : ''
        },

        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: false,
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
          onMoviesChange({ ...current, results: movies });

          setTotalResults(current.total_results);
          setHasSubmitted(true);

          if (data.pages.length === 1 && queryString.parse(location.search)?.mediaType === 'movie') {
            dispatch(
              setRecentSearches([
                ...recentSearches,
                {
                  id: uuid(),
                  label: localQuery || query,
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

  const searchTV = useInfiniteQuery(
    'searchTV',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialTV[]>>('/search/tv', {
        params: {
          query: localQuery || query || queryString.parse(location.search)?.query || '',
          page: pageParam || queryString.parse(location.search)?.page || 1,
          sort_by: sortBy ? `${sortBy.find((sort) => sort.isActive)?.value}.${sortDirection}` : ''
        },

        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: false,
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
          onTVChange({ ...current, results: tv });

          setTotalResults(current.total_results);
          setHasSubmitted(true);

          if (data.pages.length === 1 && queryString.parse(location.search)?.mediaType === 'tv') {
            dispatch(
              setRecentSearches([
                ...recentSearches,
                {
                  id: uuid(),
                  label: localQuery || query,
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

  const searchPeople = useInfiniteQuery(
    'searchPeople',
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/search/person', {
        params: {
          query: localQuery || query || queryString.parse(location.search)?.query || '',
          page: pageParam || queryString.parse(location.search)?.page || 1,
          sort_by: sortBy ? `${sortBy.find((sort) => sort.isActive)?.value}.${sortDirection}` : ''
        },

        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: false,
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
          onPeopleChange({ ...current, results: people });

          setTotalResults(current.total_results);
          setHasSubmitted(true);

          if (data.pages.length === 1 && queryString.parse(location.search)?.mediaType === 'person') {
            dispatch(
              setRecentSearches([
                ...recentSearches,
                {
                  id: uuid(),
                  label: localQuery || query,
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

  const handleSetFocus = (): void => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchQuery = (query: string): void => {
    const params = queryString.parse(history.location.search);

    setLocalQuery(query);
    onQueryChange(query.trim());

    if (params && params.mediaType) {
      switch (params.mediaType) {
        case 'person':
          searchPeople.refetch();
          break;
        case 'tv':
          searchTV.refetch();
          break;
        case 'movie':
          searchMovies.refetch();
          break;
        default:
          break;
      }
    } else {
      searchMovies.refetch();
      searchTV.refetch();
      searchPeople.refetch();
    }
  };

  const handleResetSearch = (): void => {
    setIsLocked(false);
    setIsHoveringLock(false);
    setIsFocused(false);
    setIsHovering(false);
    setHasSubmitted(false);
    setLocalQuery('');
    setTotalResults(undefined);
  };

  useOutsideClick({
    ref: inputRef,
    handler: !isHoveringLock && !isLocked && !isHovering ? () => setIsFocused(false) : undefined
  });

  useEffect(() => {
    const params = queryString.parse(location.search, { parseNumbers: true });

    if ((localQuery && localQuery.length > 0) || (query && query.length > 0)) {
      if (params && params.page && params.mediaType) {
        switch (params.mediaType) {
          case 'person': {
            if (searchPeople.hasNextPage) {
              searchPeople.fetchNextPage();
            }
            break;
          }
          case 'tv': {
            if (searchTV.hasNextPage) {
              searchTV.fetchNextPage();
            }
            break;
          }
          case 'movie': {
            if (searchMovies.hasNextPage) {
              searchMovies.fetchNextPage();
            }
            break;
          }
          default:
            break;
        }
      } else {
        handleSearchQuery(localQuery || query);
      }
    } else if (params && params.query && typeof params.query === 'string') {
      handleSearchQuery(params.query);
    }
  }, [history.location.search]);

  useEffect(() => {
    const params = queryString.parse(location.search, { parseNumbers: true });

    if (params && params.mediaType && params.mediaType === 'movie' && onIsLoading) {
      onIsLoading(searchMovies.isFetching || searchMovies.isLoading);
    }
  }, [searchMovies.isFetching, searchMovies.isLoading]);

  useEffect(() => {
    const params = queryString.parse(location.search, { parseNumbers: true });

    if (params && params.mediaType && params.mediaType === 'tv' && onIsLoading) {
      onIsLoading(searchTV.isFetching || searchTV.isLoading);
    }
  }, [searchTV.isFetching, searchTV.isLoading]);

  useEffect(() => {
    const params = queryString.parse(location.search, { parseNumbers: true });

    if (params && params.mediaType && params.mediaType === 'person' && onIsLoading) {
      onIsLoading(searchPeople.isFetching || searchPeople.isLoading);
    }
  }, [searchPeople.isFetching, searchPeople.isLoading]);

  useEffect(() => {
    if (searchMovies.isSuccess && searchTV.isSuccess && searchPeople.isSuccess && (localQuery || query)) {
      const totalMovies =
        searchMovies.data && searchMovies.data.pages && searchMovies.data.pages[searchMovies.data.pages.length - 1]
          ? searchMovies.data.pages[searchMovies.data.pages.length - 1].total_results
          : 0;
      const totalTV =
        searchTV.data && searchTV.data.pages && searchTV.data.pages[searchTV.data.pages.length - 1]
          ? searchTV.data.pages[searchTV.data.pages.length - 1].total_results
          : 0;
      const totalPeople =
        searchPeople.data && searchPeople.data.pages && searchPeople.data.pages[searchPeople.data.pages.length - 1]
          ? searchPeople.data.pages[searchPeople.data.pages.length - 1].total_results
          : 0;

      setHasSubmitted(true);
      setTotalResults(totalMovies + totalTV + totalPeople);

      dispatch(
        setRecentSearches([
          ...recentSearches,
          { id: uuid(), label: localQuery || query, date: moment(new Date()).toISOString(), type: 'isKeyword' }
        ])
      );
    }
  }, [searchMovies.isSuccess, searchTV.isSuccess, searchPeople.isSuccess]);

  useEffect(() => {
    handleResetSearch();
  }, [history.location.pathname]);

  useEffect(() => {
    return () => source.cancel();
  }, []);

  return (
    <VStack spacing={1}>
      <Box
        width='100%'
        cursor='text'
        border='solid2'
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        borderRadius='lg'
        px={2}
        pt={1}
        pb={isFocused || isLocked ? 2 : 1}
        onClick={() => handleSetFocus()}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <HStack
          borderBottom={isFocused || isLocked ? 'solid2' : 'none'}
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          pb={isFocused || isLocked ? 1 : 0}
          mb={isFocused || isLocked ? 2 : 0}>
          <Icon as={SearchOutlinedIcon} color={colorMode === 'light' ? 'gray.400' : 'gray.500'} />
          <Input
            ref={inputRef}
            borderRadius='none'
            placeholder='Try "The Godfather"'
            onFocus={!isHoveringLock && !isLocked ? () => setIsFocused(true) : undefined}
            onBlur={!isHoveringLock && !isLocked && !isHovering ? () => setIsFocused(false) : undefined}
            onKeyPress={(event) => {
              if (event.key === 'Enter' && !hasSubmitted) {
                history.push({
                  pathname: history.location.pathname,
                  search: queryString.stringify({ query: localQuery })
                });
              }
            }}
            onChange={(event) => {
              setLocalQuery(event.target.value);
              setHasSubmitted(false);

              if (hasSubmitted) {
                searchMovies.remove();
                searchTV.remove();
                searchPeople.remove();
              }
            }}
            variant='unstyled'
            value={localQuery}
          />
          <HStack spacing={0}>
            <ScaleFade in={localQuery.length > 0} unmountOnExit>
              <Tooltip label='Clear search' placement='top'>
                <IconButton
                  aria-label='Clear search'
                  icon={ClearOutlinedIcon}
                  onClick={() => setLocalQuery('')}
                  size='xs'
                  variant='icon'
                />
              </Tooltip>
            </ScaleFade>
            <Tooltip
              label={isLocked ? 'Unlock Search' : 'Lock Search'}
              placement='top'
              closeOnClick={false}
              closeOnMouseDown={false}>
              <IconButton
                aria-label={isLocked ? 'Unlock Search' : 'Lock Search'}
                icon={isLocked ? LockOutlinedIcon : LockOpenOutlinedIcon}
                onClick={() => setIsLocked(!isLocked)}
                onMouseEnter={() => setIsHoveringLock(true)}
                onMouseLeave={() => setIsHoveringLock(false)}
                size='xs'
                variant='icon'
              />
            </Tooltip>
          </HStack>
        </HStack>
        <Collapse in={isFocused || isLocked} unmountOnExit>
          <List spacing={0}>
            {keywords.isFetching || keywords.isLoading ? (
              [...Array(5)].map((_dummy, index) => (
                <Row key={index} id={`${index}`} label='' state='isLoading' type='isKeyword' />
              ))
            ) : keywords.isSuccess && keywords.data.length > 0 && !hasSubmitted ? (
              keywords.data.map((keyword, index) =>
                index < 5 ? (
                  <Row
                    key={keyword.id}
                    id={`${keyword.id}`}
                    label={keyword.name}
                    state='isLoaded'
                    type='isKeyword'
                    onSearch={(query: string) => {
                      setLocalQuery(query);

                      history.push({
                        pathname: history.location.pathname,
                        search: queryString.stringify({ query })
                      });
                    }}
                  />
                ) : null
              )
            ) : (
              <Default />
            )}
          </List>
        </Collapse>
      </Box>

      <ScaleFade in={Boolean(totalResults) || hasSubmitted} unmountOnExit style={{ width: '100%' }}>
        <Display query={query} totalResults={totalResults} />
      </ScaleFade>
    </VStack>
  );
};

export default SearchForm;
