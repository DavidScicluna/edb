import { ReactElement, useState, useCallback, useEffect } from 'react';

import { useBoolean, VStack, Center, Fade, Collapse } from '@chakra-ui/react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import moment from 'moment';
import qs from 'query-string';
import { useInfiniteQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { useSelector } from '../../common/hooks';
import axiosInstance from '../../common/scripts/axios';
import { Response, Company } from '../../common/types';
import { PartialMovie } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import Divider from '../../components/Divider';
import Empty from '../../components/Empty';
import Page from '../../containers/Page';
import { setRecentSearches } from '../../store/slices/User';
import { Search as SearchType, SearchType as SearchTypeValue } from '../../store/slices/User/types';
import All from './components/All';
import Display from './components/Display';
import Form from './components/Form';
import Input from './components/Input';
import Keywords from './components/Keywords';
import { Keyword } from './components/Keywords/types';
import RecentSearches from './components/RecentSearches';
import SearchTypes from './components/SearchTypes';
import { InputKeyboardEvent, InputChangeEvent, Collection } from './types';

const Search = (): ReactElement => {
  const source = axios.CancelToken.source();

  const history = useHistory();
  const params = useParams();

  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.user.data.recentSearches);

  const [submittedQuery, setSubmittedQuery] = useState<string>('');
  const [unSubmittedQuery, setUnSubmittedQuery] = useState<string>('');

  const [keywords, setKeywords] = useState<Response<Keyword[]>>();

  const [searchTypes, setSearchTypes] = useState<SearchTypeValue[]>([]);

  const [movies, setMovies] = useState<Response<PartialMovie[]>>();
  const [shows, setShows] = useState<Response<PartialTV[]>>();
  const [people, setPeople] = useState<Response<PartialPerson[]>>();

  const [companies, setCompanies] = useState<Response<Company[]>>();
  const [collections, setCollections] = useState<Response<Collection[]>>();

  const [isQuerySubmitted, setIsQuerySubmitted] = useBoolean();

  // Fetching Keywords
  const keywordsQuery = useInfiniteQuery(
    [`${unSubmittedQuery}-keywords`, unSubmittedQuery],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<Keyword[]>>('/search/keyword', {
        params: { query: unSubmittedQuery, page: pageParam },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: false,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false),
      onSuccess: (data) => {
        let keywords: Keyword[] = [];

        data.pages.forEach((page) => {
          keywords = [...keywords, ...(page?.results || [])];
        });

        setKeywords({
          page: data.pages[data.pages.length - 1].page,
          results: [..._.uniqBy(keywords, 'id')],
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });
      }
    }
  );

  // Searching Movies
  const searchMoviesQuery = useInfiniteQuery(
    [`${submittedQuery}-movies`, submittedQuery],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialMovie[]>>('/search/movie', {
        params: {
          query: submittedQuery || '',
          page: pageParam || 1,
          include_adult: true
        },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (searchTypes.length === 0 || searchTypes.some((type) => type === 'movie')) && submittedQuery.length > 0,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false),
      onSuccess: (data) => {
        let movies: PartialMovie[] = [];

        data.pages.forEach((page) => {
          movies = [...movies, ...(page?.results || [])];
        });

        setMovies({
          page: data.pages[data.pages.length - 1].page,
          results: [..._.uniqBy(movies, 'id')],
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });

        if (data.pages.length === 1 && (searchTypes.length === 0 || searchTypes.some((type) => type === 'movie'))) {
          dispatch(
            setRecentSearches([
              ..._.uniqBy(
                [
                  ...recentSearches,
                  {
                    id: qs.stringify({ query: submittedQuery, date: moment(new Date()).format('LLLL'), searchTypes }),
                    label: submittedQuery,
                    date: moment(new Date()).toISOString(),
                    searchTypes
                  }
                ],
                'id'
              )
            ])
          );
        }
      }
    }
  );

  // Searching TV Shows
  const searchTVQuery = useInfiniteQuery(
    [`${submittedQuery}-tv-shows`, submittedQuery],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialTV[]>>('/search/tv', {
        params: {
          query: submittedQuery || '',
          page: pageParam || 1,
          include_adult: true
        },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (searchTypes.length === 0 || searchTypes.some((type) => type === 'tv')) && submittedQuery.length > 0,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false),
      onSuccess: (data) => {
        let shows: PartialTV[] = [];

        data.pages.forEach((page) => {
          shows = [...shows, ...(page?.results || [])];
        });

        setShows({
          page: data.pages[data.pages.length - 1].page,
          results: [..._.uniqBy(shows, 'id')],
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });

        if (data.pages.length === 1 && (searchTypes.length === 0 || searchTypes.some((type) => type === 'tv'))) {
          dispatch(
            setRecentSearches([
              ..._.uniqBy(
                [
                  ...recentSearches,
                  {
                    id: qs.stringify({ query: submittedQuery, date: moment(new Date()).format('LLLL'), searchTypes }),
                    label: submittedQuery,
                    date: moment(new Date()).toISOString(),
                    searchTypes
                  }
                ],
                'id'
              )
            ])
          );
        }
      }
    }
  );

  // Searching People
  const searchPeopleQuery = useInfiniteQuery(
    [`${submittedQuery}-people`, submittedQuery],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<PartialPerson[]>>('/search/person', {
        params: {
          query: submittedQuery || '',
          page: pageParam || 1,
          include_adult: true
        },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled: (searchTypes.length === 0 || searchTypes.some((type) => type === 'person')) && submittedQuery.length > 0,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false),
      onSuccess: (data) => {
        let people: PartialPerson[] = [];

        data.pages.forEach((page) => {
          people = [...people, ...(page?.results || [])];
        });

        setPeople({
          page: data.pages[data.pages.length - 1].page,
          results: [..._.uniqBy(people, 'id')],
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });

        if (data.pages.length === 1 && (searchTypes.length === 0 || searchTypes.some((type) => type === 'person'))) {
          dispatch(
            setRecentSearches([
              ..._.uniqBy(
                [
                  ...recentSearches,
                  {
                    id: qs.stringify({ query: submittedQuery, date: moment(new Date()).format('LLLL'), searchTypes }),
                    label: submittedQuery,
                    date: moment(new Date()).toISOString(),
                    searchTypes
                  }
                ],
                'id'
              )
            ])
          );
        }
      }
    }
  );

  // Searching Companies
  const searchCompaniesQuery = useInfiniteQuery(
    [`${submittedQuery}-companies`, submittedQuery],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<Company[]>>('/search/company', {
        params: {
          query: submittedQuery || '',
          page: pageParam || 1
        },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled:
        (searchTypes.length === 0 || searchTypes.some((type) => type === 'company')) && submittedQuery.length > 0,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false),
      onSuccess: (data) => {
        let companies: Company[] = [];

        data.pages.forEach((page) => {
          companies = [...companies, ...(page?.results || [])];
        });

        setCompanies({
          page: data.pages[data.pages.length - 1].page,
          results: [..._.uniqBy(companies, 'id')],
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });

        if (data.pages.length === 1 && (searchTypes.length === 0 || searchTypes.some((type) => type === 'company'))) {
          dispatch(
            setRecentSearches([
              ..._.uniqBy(
                [
                  ...recentSearches,
                  {
                    id: qs.stringify({ query: submittedQuery, date: moment(new Date()).format('LLLL'), searchTypes }),
                    label: submittedQuery,
                    date: moment(new Date()).toISOString(),
                    searchTypes
                  }
                ],
                'id'
              )
            ])
          );
        }
      }
    }
  );

  // Searching Collections
  const searchCollectionsQuery = useInfiniteQuery(
    [`${submittedQuery}-collections`, submittedQuery],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get<Response<Collection[]>>('/search/collection', {
        params: {
          query: submittedQuery || '',
          page: pageParam || 1
        },
        cancelToken: source.token
      });
      return data;
    },
    {
      enabled:
        (searchTypes.length === 0 || searchTypes.some((type) => type === 'collection')) && submittedQuery.length > 0,
      getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false),
      onSuccess: (data) => {
        let collections: Collection[] = [];

        data.pages.forEach((page) => {
          collections = [...collections, ...(page?.results || [])];
        });

        setCollections({
          page: data.pages[data.pages.length - 1].page,
          results: [..._.uniqBy(collections, 'id')],
          total_pages: data.pages[data.pages.length - 1].total_pages,
          total_results: data.pages[data.pages.length - 1].total_results
        });

        if (
          data.pages.length === 1 &&
          (searchTypes.length === 0 || searchTypes.some((type) => type === 'collection'))
        ) {
          dispatch(
            setRecentSearches([
              ..._.uniqBy(
                [
                  ...recentSearches,
                  {
                    id: qs.stringify({ query: submittedQuery, date: moment(new Date()).format('LLLL'), searchTypes }),
                    label: submittedQuery,
                    date: moment(new Date()).toISOString(),
                    searchTypes
                  }
                ],
                'id'
              )
            ])
          );
        }
      }
    }
  );

  const handleFetchKeywords = useCallback(
    _.debounce(() => {
      keywordsQuery.refetch();
    }, 500),
    []
  );

  const handleSubmitQuery = (query: string, paramSearchTypes?: SearchTypeValue[]): void => {
    history.push({
      pathname: '/search',
      search: qs.stringify({ query, types: paramSearchTypes || searchTypes })
    });
  };

  const handleOnKeyPress = (event: InputKeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleSubmitQuery(unSubmittedQuery);
    }
  };

  const handleOnChange = (event: InputChangeEvent): void => {
    setUnSubmittedQuery(event.target.value);

    handleFetchKeywords();

    setIsQuerySubmitted.off();
  };

  const handleClearQuery = (): void => {
    setSubmittedQuery('');
    setUnSubmittedQuery('');

    setSearchTypes([]);

    setIsQuerySubmitted.on();
  };

  const handleOnSearchClick = (label: SearchType['label'], searchTypes?: SearchTypeValue[]): void => {
    if (searchTypes && searchTypes.length > 0) {
      setSearchTypes([...searchTypes]);
    }

    handleSubmitQuery(label, searchTypes);
  };

  const handleSetSearchTypes = (searchTypes: SearchTypeValue[]): void => {
    setSubmittedQuery('');

    setSearchTypes(searchTypes);

    setIsQuerySubmitted.on();
  };

  const handleCheckIfEmpty = (): boolean => {
    let total = 0;

    if (movies?.total_results) {
      total = total + movies.total_results;
    }

    if (shows?.total_results) {
      total = total + shows.total_results;
    }

    if (people?.total_results) {
      total = total + people.total_results;
    }

    if (collections?.total_results) {
      total = total + collections.total_results;
    }

    if (companies?.total_results) {
      total = total + companies.total_results;
    }

    return total === 0;
  };

  useEffect(() => {
    handleClearQuery();

    const search = qs.parse(history.location.search);

    if (search && search.types && Array.isArray(search.types)) {
      setSearchTypes([...search.types]);
    } else if (search && search.types && typeof search.types === 'string') {
      setSearchTypes([search.types]);
    }

    if (search && search.query && typeof search.query === 'string') {
      setUnSubmittedQuery(search.query);
      setSubmittedQuery(search.query);

      setIsQuerySubmitted.on();
    }
  }, [params]);

  useEffect(() => {
    return () => {
      source.cancel();

      handleClearQuery();
    };
  }, []);

  return (
    <Page title='Search'>
      {{
        body: (
          <VStack width='100%' spacing={4} px={2} pt={2}>
            {/* Search Form Container */}
            <Form>
              {{
                input: (
                  <Input
                    query={unSubmittedQuery}
                    isDisabled={
                      searchMoviesQuery.isFetching ||
                      searchMoviesQuery.isLoading ||
                      searchTVQuery.isFetching ||
                      searchTVQuery.isLoading ||
                      searchPeopleQuery.isFetching ||
                      searchPeopleQuery.isLoading ||
                      searchCompaniesQuery.isFetching ||
                      searchCompaniesQuery.isLoading ||
                      searchCollectionsQuery.isFetching ||
                      searchCollectionsQuery.isLoading
                    }
                    searchTypes={searchTypes}
                    onInputKeyPress={handleOnKeyPress}
                    onInputChange={handleOnChange}
                    onSubmitQuery={() => handleSubmitQuery(unSubmittedQuery)}
                    onClearQuery={handleClearQuery}
                    onClearSearchTypes={() => handleSetSearchTypes([])}
                  />
                ),
                collapsibleContent:
                  keywordsQuery.isFetching ||
                  keywordsQuery.isLoading ||
                  (!isQuerySubmitted &&
                    unSubmittedQuery.length > 0 &&
                    !keywordsQuery.isError &&
                    (keywords?.total_results || 0) > 0) ? (
                    <Keywords
                      keywords={keywords}
                      isLoading={keywordsQuery.isFetching || keywordsQuery.isLoading}
                      isError={keywordsQuery.isError}
                      isSuccess={keywordsQuery.isSuccess}
                      hasNextPage={keywordsQuery.hasNextPage}
                      onKeywordClick={(name: Keyword['name']) => handleSubmitQuery(name)}
                      onFetchNextPage={keywordsQuery.fetchNextPage}
                    />
                  ) : (
                    <VStack width='100%' divider={<Divider />} spacing={2}>
                      <SearchTypes searchTypes={searchTypes} onSetSearchTypes={handleSetSearchTypes} />
                      <RecentSearches onSearchClick={handleOnSearchClick} />
                    </VStack>
                  ),
                display: (
                  <Collapse in={isQuerySubmitted && submittedQuery.length > 0} unmountOnExit style={{ width: '100%' }}>
                    <Display
                      query={submittedQuery}
                      searchTypes={searchTypes}
                      totalResults={{
                        movie: movies?.total_results || 0,
                        tv: shows?.total_results || 0,
                        person: people?.total_results || 0,
                        collection: collections?.total_results || 0,
                        company: companies?.total_results || 0
                      }}
                    />
                  </Collapse>
                )
              }}
            </Form>

            <AnimatePresence exitBeforeEnter initial={false}>
              {isQuerySubmitted && submittedQuery.length > 0 && !handleCheckIfEmpty() ? (
                <Center as={Fade} key='search-submitted' width='100%' in unmountOnExit>
                  <All
                    query={submittedQuery}
                    moviesQuery={searchMoviesQuery}
                    tvQuery={searchTVQuery}
                    peopleQuery={searchPeopleQuery}
                    companiesQuery={searchCompaniesQuery}
                    collectionsQuery={searchCollectionsQuery}
                  />
                </Center>
              ) : isQuerySubmitted && submittedQuery.length > 0 && handleCheckIfEmpty() ? (
                <Center as={Fade} key='search-empty' width='100%' in unmountOnExit>
                  <Empty
                    label='Oh no!'
                    description={`Unfortantly couldnt find anthing that match "${submittedQuery}"`}
                  />
                </Center>
              ) : (
                <Center as={Fade} key='search-unsubmitted' width='100%' in unmountOnExit>
                  <Empty label='' />
                </Center>
              )}
            </AnimatePresence>
          </VStack>
        )
      }}
    </Page>
  );
};

export default Search;
