import { ReactElement, useState, useCallback, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useBoolean, VStack, Center, Fade, Collapse } from '@chakra-ui/react';

import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import moment from 'moment';
import qs from 'query-string';

import All from './components/All';
import Form from './components/Form';
import Display from './components/Form/components/Display';
import Input from './components/Form/components/Input';
import Keywords from './components/Form/components/Keywords';
import { Keyword } from './components/Form/components/Keywords/types';
import RecentSearches from './components/Form/components/RecentSearches';
import SearchTypes from './components/Form/components/SearchTypes';
import { InputKeyboardEvent, InputChangeEvent } from './types';

import { useSelector } from '../../common/hooks';
import axiosInstance from '../../common/scripts/axios';
import { Response, PartialCompany } from '../../common/types';
import { PartialMovie, Collection } from '../../common/types/movie';
import { PartialPerson } from '../../common/types/person';
import { PartialTV } from '../../common/types/tv';
import DisplayMode from '../../components/Clickable/DisplayMode';
import Divider from '../../components/Divider';
import Empty from '../../components/Empty';
import Page from '../../containers/Page';
import { setRecentSearches } from '../../store/slices/User';
import { Search as SearchType, SearchType as SearchTypeValue } from '../../store/slices/User/types';

const Search = (): ReactElement => {
	const source = axios.CancelToken.source();

	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	const dispatch = useDispatch();
	const recentSearches = useSelector((state) => state.user.data.recentSearches);

	const [submittedQuery, setSubmittedQuery] = useState<string>('');
	const [unSubmittedQuery, setUnSubmittedQuery] = useState<string>('');

	const [keywords, setKeywords] = useState<Response<Keyword[]>>();

	const [submittedSearchTypes, setSubmittedSearchTypes] = useState<SearchTypeValue[]>([]);
	const [unSubmittedSearchTypes, setUnSubmittedSearchTypes] = useState<SearchTypeValue[]>([]);

	const [movies, setMovies] = useState<Response<PartialMovie[]>>();
	const [shows, setShows] = useState<Response<PartialTV[]>>();
	const [people, setPeople] = useState<Response<PartialPerson[]>>();

	const [companies, setCompanies] = useState<Response<PartialCompany[]>>();
	const [collections, setCollections] = useState<Response<Collection[]>>();

	const [isQueryEnabled, setIsQueryEnabled] = useBoolean();
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
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
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
			enabled:
				(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'movie')) &&
				isQueryEnabled,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				setIsQueryEnabled.off();

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

				if (
					data.pages.length === 1 &&
					(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'movie'))
				) {
					dispatch(
						setRecentSearches([
							..._.uniqBy(
								[
									...recentSearches,
									{
										id: qs.stringify({
											query: submittedQuery,
											date: moment(new Date()).format('LLLL'),
											searchTypes: submittedSearchTypes
										}),
										label: submittedQuery,
										date: moment(new Date()).toISOString(),
										searchTypes: submittedSearchTypes
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
			enabled:
				(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'tv')) &&
				isQueryEnabled,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				setIsQueryEnabled.off();

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

				if (
					data.pages.length === 1 &&
					(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'tv'))
				) {
					dispatch(
						setRecentSearches([
							..._.uniqBy(
								[
									...recentSearches,
									{
										id: qs.stringify({
											query: submittedQuery,
											date: moment(new Date()).format('LLLL'),
											searchTypes: submittedSearchTypes
										}),
										label: submittedQuery,
										date: moment(new Date()).toISOString(),
										searchTypes: submittedSearchTypes
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
			enabled:
				(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'person')) &&
				isQueryEnabled,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				setIsQueryEnabled.off();

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

				if (
					data.pages.length === 1 &&
					(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'person'))
				) {
					dispatch(
						setRecentSearches([
							..._.uniqBy(
								[
									...recentSearches,
									{
										id: qs.stringify({
											query: submittedQuery,
											date: moment(new Date()).format('LLLL'),
											searchTypes: submittedSearchTypes
										}),
										label: submittedQuery,
										date: moment(new Date()).toISOString(),
										searchTypes: submittedSearchTypes
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
			const { data } = await axiosInstance.get<Response<PartialCompany[]>>('/search/company', {
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
				(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'company')) &&
				isQueryEnabled,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				setIsQueryEnabled.off();

				let companies: PartialCompany[] = [];

				data.pages.forEach((page) => {
					companies = [...companies, ...(page?.results || [])];
				});

				setCompanies({
					page: data.pages[data.pages.length - 1].page,
					results: [..._.uniqBy(companies, 'id')],
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});

				if (
					data.pages.length === 1 &&
					(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'company'))
				) {
					dispatch(
						setRecentSearches([
							..._.uniqBy(
								[
									...recentSearches,
									{
										id: qs.stringify({
											query: submittedQuery,
											date: moment(new Date()).format('LLLL'),
											searchTypes: submittedSearchTypes
										}),
										label: submittedQuery,
										date: moment(new Date()).toISOString(),
										searchTypes: submittedSearchTypes
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
				(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'collection')) &&
				isQueryEnabled,
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				setIsQueryEnabled.off();

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
					(submittedSearchTypes.length === 0 || submittedSearchTypes.some((type) => type === 'collection'))
				) {
					dispatch(
						setRecentSearches([
							..._.uniqBy(
								[
									...recentSearches,
									{
										id: qs.stringify({
											query: submittedQuery,
											date: moment(new Date()).format('LLLL'),
											searchTypes: submittedSearchTypes
										}),
										label: submittedQuery,
										date: moment(new Date()).toISOString(),
										searchTypes: submittedSearchTypes
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

	const handleSubmitQuery = useCallback(
		_.debounce((query: string, paramSearchTypes?: SearchTypeValue[]): void => {
			setMovies(undefined);
			setShows(undefined);
			setPeople(undefined);
			setCollections(undefined);
			setCompanies(undefined);

			setTimeout(() => setSearchParams({ query, types: paramSearchTypes || unSubmittedSearchTypes }), 250);
		}, 500),
		[unSubmittedSearchTypes, setMovies, setShows, setPeople, setCollections, setCompanies, setSearchParams]
	);

	const handleOnKeyPress = (event: InputKeyboardEvent): void => {
		if (event.key === 'Enter') {
			handleSubmitQuery(unSubmittedQuery);
		}
	};

	const handleOnKeywordClick = (name: Keyword['name']): void => {
		handleSubmitQuery(name);
	};

	const handleOnChange = (event: InputChangeEvent): void => {
		setUnSubmittedQuery(event.target.value);

		handleFetchKeywords();
	};

	const handleClearQuery = (): void => {
		setSubmittedQuery('');
		setUnSubmittedQuery('');

		setSubmittedSearchTypes([]);
		setUnSubmittedSearchTypes([]);

		setMovies(undefined);
		setShows(undefined);
		setPeople(undefined);
		setCollections(undefined);
		setCompanies(undefined);

		setIsQueryEnabled.off();
		setIsQuerySubmitted.off();
	};

	const handleOnSearchClick = (label: SearchType['label'], searchTypes?: SearchTypeValue[]): void => {
		setSubmittedSearchTypes([...(searchTypes || [])]);
		setUnSubmittedSearchTypes([...(searchTypes || [])]);

		handleSubmitQuery(label, searchTypes);
	};

	const handleSetSearchTypes = (searchTypes: SearchTypeValue[]): void => {
		setUnSubmittedSearchTypes(searchTypes);
	};

	const handleCheckIfEmpty = useCallback(
		_.debounce((): boolean => {
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
		}, 500),
		[movies, shows, people, collections, companies]
	);

	useEffect(() => {
		const search = qs.parse(location.search);

		if (!(_.isNil(search) || _.isEmpty(search))) {
			if (location.hash && location.hash.length > 0) {
				setSubmittedSearchTypes([location.hash.replace('#', '')]);
				setUnSubmittedSearchTypes([location.hash.replace('#', '')]);
			} else if (search && search.types && Array.isArray(search.types)) {
				setSubmittedSearchTypes(_.compact([...search.types]));
				setUnSubmittedSearchTypes(_.compact([...search.types]));
			} else if (search && search.types && typeof search.types === 'string') {
				setSubmittedSearchTypes([search.types]);
				setUnSubmittedSearchTypes([search.types]);
			}

			if (search && search.query && typeof search.query === 'string') {
				setUnSubmittedQuery(search.query.trim());
				setSubmittedQuery(search.query.trim());

				setIsQueryEnabled.on();
				setIsQuerySubmitted.on();
			}
		}
	}, [searchParams]);

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<Page title='Search' direction='row'>
			{{
				actions: (
					<Fade
						in={_.isBoolean(
							(!handleCheckIfEmpty() && submittedSearchTypes.length === 1) ||
								(location.hash && location.hash.length > 0)
						)}
						unmountOnExit
					>
						<DisplayMode />
					</Fade>
				),
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
										searchTypes={unSubmittedSearchTypes}
										onInputKeyPress={handleOnKeyPress}
										onInputChange={handleOnChange}
										onSubmitQuery={() => handleSubmitQuery(unSubmittedQuery)}
										onClearQuery={handleClearQuery}
										onClearSearchTypes={() => handleSetSearchTypes([])}
									/>
								),
								collapsibleContent: (
									<AnimatePresence exitBeforeEnter initial={false}>
										{keywordsQuery.isFetching ||
										keywordsQuery.isLoading ||
										(!isQuerySubmitted &&
											unSubmittedQuery.length > 0 &&
											!keywordsQuery.isError &&
											(keywords?.total_results || 0) > 0) ? (
											<Center as={Fade} key='search-form-keywords' width='100%' in unmountOnExit>
												<Keywords
													keywords={keywords}
													isLoading={keywordsQuery.isFetching || keywordsQuery.isLoading}
													isError={keywordsQuery.isError}
													isSuccess={keywordsQuery.isSuccess}
													hasNextPage={keywordsQuery.hasNextPage}
													onKeywordClick={handleOnKeywordClick}
													onFetchNextPage={keywordsQuery.fetchNextPage}
												/>
											</Center>
										) : (
											<VStack
												as={Fade}
												key='search-form-recent-searches'
												width='100%'
												divider={<Divider />}
												spacing={2}
												in
												unmountOnExit
											>
												<SearchTypes
													searchTypes={unSubmittedSearchTypes}
													onSetSearchTypes={handleSetSearchTypes}
												/>
												<RecentSearches onSearchClick={handleOnSearchClick} />
											</VStack>
										)}
									</AnimatePresence>
								),
								display: (
									<Collapse
										in={isQuerySubmitted && submittedQuery.length > 0}
										unmountOnExit
										style={{ width: '100%' }}
									>
										<Display
											query={submittedQuery}
											searchTypes={submittedSearchTypes}
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
										searchTypes={submittedSearchTypes}
										movies={movies}
										moviesQuery={searchMoviesQuery}
										shows={shows}
										showsQuery={searchTVQuery}
										people={people}
										peopleQuery={searchPeopleQuery}
										companies={companies}
										companiesQuery={searchCompaniesQuery}
										collections={collections}
										collectionsQuery={searchCollectionsQuery}
									/>
								</Center>
							) : isQuerySubmitted && submittedQuery.length > 0 && handleCheckIfEmpty() ? (
								<Center as={Fade} key='search-empty' width='100%' in unmountOnExit>
									<Empty
										label='Oh no! 😭'
										description={`Unfortunately couldn't find anything that match "${submittedQuery}"`}
									/>
								</Center>
							) : null}
						</AnimatePresence>
					</VStack>
				)
			}}
		</Page>
	);
};

export default Search;
