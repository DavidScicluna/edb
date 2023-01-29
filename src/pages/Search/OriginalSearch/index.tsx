import { FC, useState, useCallback, Fragment, lazy, createContext } from 'react';

import { useLocation, useNavigate } from 'react-router';

import {
	Undefinable,
	TabsOnChangeProps,
	useTheme,
	useDebounce,
	Button,
	Divider,
	AnimatePresence,
	Fade,
	Collapse,
	utils
} from '@davidscicluna/component-library';

import { useBoolean, VStack, Text, Center } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { useForm, useWatch } from 'react-hook-form';
import qs from 'query-string';
import { compact, debounce, uniqBy } from 'lodash';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { sort } from 'fast-sort';

import { method as defaultOnSetActiveTab } from '../../../common/data/defaultPropValues';
import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import PageHeader from '../../../containers/Page/components/PageHeader';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import { useKeywordsInfiniteQuery, useSearchInfiniteQuery } from '../../../common/queries';
import { Keyword, PartialCompany } from '../../../common/types';
import { Collection, PartialMovie } from '../../../common/types/movie';
import { PartialTV } from '../../../common/types/tv';
import { PartialPerson } from '../../../common/types/person';
import { useSelector, useUserTheme } from '../../../common/hooks';
import { setUserRecentSearches } from '../../../store/slices/Users';
import { UserSearch } from '../../../store/slices/Users/types';
import { UseKeywordsInfiniteQueryResponse } from '../../../common/queries/useKeywordsInfiniteQuery';
import { UseSearchInfiniteQueryResponse } from '../../../common/queries/useSearchInfiniteQuery';
import {
	QueryEmpty,
	QueryEmptyActions,
	QueryEmptyBody,
	QueryEmptyStack,
	QueryEmptySubtitle,
	QueryEmptyTitle,
	Suspense
} from '../../../components';

import SearchDummyCollections from './components/SearchDummyCollections';
import SearchDummyCompanies from './components/SearchDummyCompanies';
import SearchDummyMovies from './components/SearchDummyMovies';
import SearchDummyTVShows from './components/SearchDummyTVShows';
import SearchDummyPeople from './components/SearchDummyPeople';
import SearchDummyTabs from './components/SearchDummyTabs';
import {
	activeTab as defaultActiveTab,
	isFocused as defaultIsFocused,
	queryDataStatus as defaultQueryDataStatus
} from './common/data/defaultPropValues';
import SearchForm from './components/SearchForm';
import SearchInput from './components/SearchForm/components/SearchInput';
import { SearchContext as SearchContextType, SearchForm as SearchFormType, SearchQueryDataStatus } from './types';
import Keywords from './components/SearchForm/components/Keywords';
import SearchTypes from './components/SearchForm/components/SearchTypes';
import RecentSearches from './components/SearchForm/components/RecentSearches';
import { getKeywordsVisibility, getQueryDataStatus } from './common/utils';
import SearchInfo from './components/SearchForm/components/SearchInfo';
import { OnKeywordClickProps } from './components/SearchForm/components/Keywords/types';

const SearchTabs = lazy(() => import('./components/SearchTabs'));
const SearchMovies = lazy(() => import('./components/SearchMovies'));
const SearchPeople = lazy(() => import('./components/SearchPeople'));
const SearchTVShows = lazy(() => import('./components/SearchTVShows'));
const SearchCollections = lazy(() => import('./components/SearchCollections'));
const SearchCompanies = lazy(() => import('./components/SearchCompanies'));

const { getColor } = utils;

const defaultValues: SearchFormType = { query: '', searchTypes: [] };

export const SearchContext = createContext<SearchContextType>({
	...defaultValues,
	onSetActiveTab: defaultOnSetActiveTab
});

const OriginalSearch: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { isGuest, spacing } = useLayoutContext();

	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const id = useSelector((state) => state.users.data.activeUser.data.id);
	const recentSearches = useSelector((state) => state.users.data.activeUser.data.recentSearches || []);

	const [isSearchInputFocused, setIsSearchInputFocused] = useBoolean(defaultIsFocused);
	const [isKeywordsVisible, setIsKeywordsVisible] = useBoolean();

	const [queryDataStatus, setQueryDataStatus] = useState<SearchQueryDataStatus>(defaultQueryDataStatus);
	const queryDataStatusDebounced = useDebounce<SearchQueryDataStatus>(queryDataStatus);

	const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const [keywords, setKeywords] = useState<UseKeywordsInfiniteQueryResponse>();

	const [movies, setMovies] = useState<UseSearchInfiniteQueryResponse<'movie'>>();
	const moviesDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'movie'>>>(movies);

	const [shows, setShows] = useState<UseSearchInfiniteQueryResponse<'tv'>>();
	const showsDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'tv'>>>(shows);

	const [people, setPeople] = useState<UseSearchInfiniteQueryResponse<'person'>>();
	const peopleDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'person'>>>(people);

	const [collections, setCollections] = useState<UseSearchInfiniteQueryResponse<'collection'>>();
	const collectionsDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'collection'>>>(collections);

	const [companies, setCompanies] = useState<UseSearchInfiniteQueryResponse<'company'>>();
	const companiesDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'company'>>>(companies);

	const form = useForm<SearchFormType>({ defaultValues, mode: 'all' });

	const { control, reset } = form;

	const watchQuery = useWatch({ control, name: 'query' });
	const watchQueryDebounced = useDebounce(watchQuery);

	const watchSearchTypes = useWatch({ control, name: 'searchTypes' });
	const watchSearchTypesDebounced = useDebounce(watchSearchTypes);

	const keywordsInfiniteQuery = useKeywordsInfiniteQuery({
		props: { query: watchQueryDebounced },
		options: {
			enabled: false,
			onSuccess: (data) => {
				let keywords: Keyword[] = [];

				data.pages.forEach((page) => {
					keywords = [...keywords, ...(page?.results || [])];
				});

				setKeywords({
					page: data.pages[data.pages.length - 1].page,
					results: uniqBy([...keywords], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	const { refetch: refetchKeywordsInfiniteQuery } = keywordsInfiniteQuery;

	const searchMoviesInfiniteQuery = useSearchInfiniteQuery<'movie'>({
		props: { mediaType: 'movie', query: watchQueryDebounced },
		options: {
			enabled: false,
			onSuccess: (data) => {
				let movies: PartialMovie[] = [];

				data.pages.forEach((page) => {
					movies = [...movies, ...(page?.results || [])];
				});

				setMovies({
					page: data.pages[data.pages.length - 1].page,
					results: uniqBy([...movies], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	const { refetch: refetchSearchMoviesInfiniteQuery } = searchMoviesInfiniteQuery;

	const searchShowsInfiniteQuery = useSearchInfiniteQuery<'tv'>({
		props: { mediaType: 'tv', query: watchQueryDebounced },
		options: {
			enabled: false,
			onSuccess: (data) => {
				let shows: PartialTV[] = [];

				data.pages.forEach((page) => {
					shows = [...shows, ...(page?.results || [])];
				});

				setShows({
					page: data.pages[data.pages.length - 1].page,
					results: uniqBy([...shows], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	const { refetch: refetchSearchShowsInfiniteQuery } = searchShowsInfiniteQuery;

	const searchPeopleInfiniteQuery = useSearchInfiniteQuery<'person'>({
		props: { mediaType: 'person', query: watchQueryDebounced },
		options: {
			enabled: false,
			onSuccess: (data) => {
				let people: PartialPerson[] = [];

				data.pages.forEach((page) => {
					people = [...people, ...(page?.results || [])];
				});

				setPeople({
					page: data.pages[data.pages.length - 1].page,
					results: uniqBy([...people], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	const { refetch: refetchSearchPeopleInfiniteQuery } = searchPeopleInfiniteQuery;

	const searchCollectionsInfiniteQuery = useSearchInfiniteQuery<'collection'>({
		props: { mediaType: 'collection', query: watchQueryDebounced },
		options: {
			enabled: false,
			onSuccess: (data) => {
				let collections: Collection[] = [];

				data.pages.forEach((page) => {
					collections = [...collections, ...(page?.results || [])];
				});

				setCollections({
					page: data.pages[data.pages.length - 1].page,
					results: uniqBy([...collections], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	const { refetch: refetchSearchCollectionsInfiniteQuery } = searchCollectionsInfiniteQuery;

	const searchCompaniesInfiniteQuery = useSearchInfiniteQuery<'company'>({
		props: { mediaType: 'company', query: watchQueryDebounced },
		options: {
			enabled: false,
			onSuccess: (data) => {
				let companies: PartialCompany[] = [];

				data.pages.forEach((page) => {
					companies = [...companies, ...(page?.results || [])];
				});

				setCompanies({
					page: data.pages[data.pages.length - 1].page,
					results: uniqBy([...companies], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	const { refetch: refetchSearchCompaniesInfiniteQuery } = searchCompaniesInfiniteQuery;

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		document.scrollingElement?.scrollTo(0, 0);
		setTimeout(() => setActiveTab(index), 500);
	};

	const handleKeywordsVisibility = (): void => {
		const isVisible = getKeywordsVisibility({
			location,
			watchQuery: watchQueryDebounced,
			isSearchInputFocused,
			total: keywords?.total_results
		});

		setIsKeywordsVisible[isVisible ? 'on' : 'off']();
	};

	const handleKeywordClick = ({ name }: OnKeywordClickProps): void => {
		if (name) {
			handleSubmitQuery({
				query: name,
				searchTypes: watchSearchTypesDebounced
			});
		}
	};

	const handleSearchParams = (): void => {
		const search = qs.parse(location.search);
		const query = search && search.query && typeof search.query === 'string' ? search.query : '';
		const searchTypes =
			search && search.searchTypes && Array.isArray(search.searchTypes) ? compact(search.searchTypes) : [];

		reset({ query, searchTypes });

		if (query) {
			handleSubmitQuery({ query, searchTypes });
		}
	};

	const handleQueryData = useCallback(
		debounce((): void => {
			setQueryDataStatus(
				getQueryDataStatus({
					movies: moviesDebounced?.total_results,
					shows: showsDebounced?.total_results,
					people: peopleDebounced?.total_results,
					collections: collectionsDebounced?.total_results,
					companies: companiesDebounced?.total_results
				})
			);
		}, 250),
		[moviesDebounced, showsDebounced, peopleDebounced, collectionsDebounced, companiesDebounced]
	);

	const handleSubmitQuery = useCallback(
		debounce(({ query, searchTypes }: SearchFormType): void => {
			setQueryDataStatus('hidden');

			setKeywords(undefined);

			setMovies(undefined);
			setShows(undefined);
			setPeople(undefined);
			setCompanies(undefined);
			setCollections(undefined);

			reset({ query: query.trim(), searchTypes });

			setActiveTab(defaultActiveTab);

			if (!isGuest) {
				const newRecentSearches: UserSearch = {
					id: uuid(),
					label: query.trim(),
					searchedAt: dayjs(new Date()).toISOString(),
					searchTypes
				};
				const updatedRecentSearches: UserSearch[] = sort(
					uniqBy([...recentSearches, newRecentSearches], 'id')
				).desc(({ searchedAt }) => searchedAt);

				dispatch(setUserRecentSearches({ id, data: [...updatedRecentSearches] }));
			}

			setTimeout(() => {
				if (searchTypes.length === 0 || searchTypes.some((type) => type === 'movie')) {
					refetchSearchMoviesInfiniteQuery();
				}
				if (searchTypes.length === 0 || searchTypes.some((type) => type === 'tv')) {
					refetchSearchShowsInfiniteQuery();
				}
				if (searchTypes.length === 0 || searchTypes.some((type) => type === 'person')) {
					refetchSearchPeopleInfiniteQuery();
				}
				if (searchTypes.length === 0 || searchTypes.some((type) => type === 'collection')) {
					refetchSearchCollectionsInfiniteQuery();
				}
				if (searchTypes.length === 0 || searchTypes.some((type) => type === 'company')) {
					refetchSearchCompaniesInfiniteQuery();
				}
			}, 250);

			navigate({ ...location, search: qs.stringify({ query: query.trim(), searchTypes }) }, { replace: false });
		}, 250),
		[defaultActiveTab, isGuest, recentSearches, id, location]
	);

	const handleClearAllQuery = (): void => {
		setQueryDataStatus('hidden');

		setActiveTab(defaultActiveTab);

		setKeywords(undefined);

		setMovies(undefined);
		setShows(undefined);
		setPeople(undefined);
		setCollections(undefined);
		setCompanies(undefined);

		setIsKeywordsVisible.off();
		setIsSearchInputFocused.on();

		reset({ ...defaultValues });

		navigate({ ...location, search: '' }, { replace: true });
	};

	useUpdateEffect(() => {
		handleKeywordsVisibility();
	}, [location.search, watchQueryDebounced, isSearchInputFocused, keywords]);

	useUpdateEffect(() => {
		if (watchQueryDebounced.length > 0) {
			refetchKeywordsInfiniteQuery();
		}
	}, [watchQueryDebounced]);

	useUpdateEffect(() => {
		handleQueryData();
	}, [moviesDebounced, showsDebounced, peopleDebounced, collectionsDebounced, companiesDebounced]);

	useEffectOnce(() => {
		if (location.search.length > 0) {
			handleSearchParams();
		} else {
			setIsSearchInputFocused.on();
		}
	});

	return (
		<SearchContext.Provider
			value={{
				query: watchQueryDebounced,
				searchTypes: watchSearchTypesDebounced,
				onSetActiveTab: handleTabChange
			}}
		>
			<Page>
				<PageHeader
					renderTitle={(props) => <Text {...props}>Search</Text>}
					renderSubtitle={(props) => (
						<Text {...props}>Search anything from Movies, TV Shows, People, Collections or Companies</Text>
					)}
					direction='row'
					spacing={spacing}
					px={spacing}
					py={spacing * 2}
				/>
				<PageBody p={spacing}>
					<VStack
						width='100%'
						divider={
							<Divider
								colorMode={colorMode}
								mb={queryDataStatusDebounced !== 'empty' ? '0px !important' : undefined}
							/>
						}
						spacing={spacing}
					>
						<SearchForm
							isFocused={isSearchInputFocused}
							onFocus={() => setIsSearchInputFocused.on()}
							onBlur={() => setIsSearchInputFocused.off()}
						>
							{{
								input: (
									<SearchInput
										form={form}
										isFocused={isSearchInputFocused}
										onFocus={() => setIsSearchInputFocused.on()}
										onBlur={() => setIsSearchInputFocused.off()}
										onClearQuery={() => reset({ ...defaultValues })}
										onSubmitQuery={handleSubmitQuery}
									/>
								),
								collapsible: (
									<AnimatePresence>
										{isKeywordsVisible ? (
											<Fade
												key='ds-edb-search-form-collapsible-content-1'
												in
												style={{ width: '100%' }}
											>
												<Keywords
													query={keywordsInfiniteQuery}
													keywords={keywords}
													onKeywordClick={handleKeywordClick}
												/>
											</Fade>
										) : (
											<Fade
												key='ds-edb-search-form-collapsible-content-2'
												in
												style={{ width: '100%' }}
											>
												<VStack
													width='100%'
													divider={<Divider colorMode={colorMode} />}
													spacing={2}
												>
													<SearchTypes form={form} />

													{!isGuest && recentSearches.length > 0 && (
														<RecentSearches
															onSearchClick={({ label, searchTypes = [] }) =>
																handleSubmitQuery({ query: label, searchTypes })
															}
														/>
													)}
												</VStack>
											</Fade>
										)}
									</AnimatePresence>
								),
								info: (
									<Collapse
										in={
											queryDataStatusDebounced === 'single' ||
											queryDataStatusDebounced === 'multiple'
										}
										style={{ width: '100%' }}
									>
										<SearchInfo
											total={{
												movie: moviesDebounced?.total_results || 0,
												tv: showsDebounced?.total_results || 0,
												person: peopleDebounced?.total_results || 0,
												company: companiesDebounced?.total_results || 0,
												collection: collectionsDebounced?.total_results || 0
											}}
										/>
									</Collapse>
								)
							}}
						</SearchForm>

						{queryDataStatusDebounced === 'empty' ? (
							<QueryEmpty
								color={color}
								colorMode={colorMode}
								borderWidth='2px'
								borderStyle='dashed'
								borderColor={getColor({ theme, colorMode, type: 'divider' })}
								borderRadius='lg'
							>
								<QueryEmptyStack>
									<QueryEmptyBody>
										<QueryEmptyTitle />
										<QueryEmptySubtitle>
											{`Unfortunately couldn't find anything that match with the query "${watchQueryDebounced}"`}
										</QueryEmptySubtitle>
									</QueryEmptyBody>
									<QueryEmptyActions
										renderActions={(props) => (
											<Button {...props} onClick={() => handleClearAllQuery()}>
												Clear Search
											</Button>
										)}
									/>
								</QueryEmptyStack>
							</QueryEmpty>
						) : (
							(queryDataStatusDebounced === 'single' || queryDataStatusDebounced === 'multiple') && (
								<Center width='100%' pt={queryDataStatusDebounced === 'single' ? spacing : 0}>
									{queryDataStatusDebounced === 'multiple' ? (
										<Suspense fallback={<SearchDummyTabs />}>
											<SearchTabs
												activeTab={activeTabDebounced}
												movie={{ query: searchMoviesInfiniteQuery, data: movies }}
												tv={{ query: searchShowsInfiniteQuery, data: shows }}
												person={{ query: searchPeopleInfiniteQuery, data: people }}
												collection={{
													query: searchCollectionsInfiniteQuery,
													data: collections
												}}
												company={{ query: searchCompaniesInfiniteQuery, data: companies }}
											/>
										</Suspense>
									) : (
										<Fragment>
											{(moviesDebounced?.total_results || 0) > 0 && (
												<Suspense fallback={<SearchDummyMovies />}>
													<SearchMovies query={searchMoviesInfiniteQuery} data={movies} />
												</Suspense>
											)}

											{(showsDebounced?.total_results || 0) > 0 && (
												<Suspense fallback={<SearchDummyTVShows />}>
													<SearchTVShows query={searchShowsInfiniteQuery} data={shows} />
												</Suspense>
											)}

											{(peopleDebounced?.total_results || 0) > 0 && (
												<Suspense fallback={<SearchDummyPeople />}>
													<SearchPeople query={searchPeopleInfiniteQuery} data={people} />
												</Suspense>
											)}

											{(collectionsDebounced?.total_results || 0) > 0 && (
												<Suspense fallback={<SearchDummyCollections />}>
													<SearchCollections
														query={searchCollectionsInfiniteQuery}
														data={collections}
													/>
												</Suspense>
											)}

											{(companiesDebounced?.total_results || 0) > 0 && (
												<Suspense fallback={<SearchDummyCompanies />}>
													<SearchCompanies
														query={searchCompaniesInfiniteQuery}
														data={companies}
													/>
												</Suspense>
											)}
										</Fragment>
									)}
								</Center>
							)
						)}
					</VStack>
				</PageBody>
			</Page>
		</SearchContext.Provider>
	);
};

export default OriginalSearch;
