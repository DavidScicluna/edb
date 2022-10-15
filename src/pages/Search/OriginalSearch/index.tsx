import { FC, useState, useCallback, Fragment, lazy } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { Undefinable, Button, Divider, Fade, Collapse } from '@davidscicluna/component-library';

import { useBoolean, VStack, Text, Center } from '@chakra-ui/react';

import { v4 as uuid } from 'uuid';
import { AnimatePresence } from 'framer-motion';
import { useForm, useWatch } from 'react-hook-form';
import qs from 'query-string';
import { compact, debounce, uniqBy } from 'lodash';
import { useDebounce, useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

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
import { getEmptySubtitle } from '../../../components/QueryEmpty/common/utils';

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
import SearchInfo from './components/SearchForm/components/SearchInfo';
import SearchInput from './components/SearchForm/components/SearchInput';
import { SearchForm as SearchFormType, SearchQueryDataStatus } from './types';
import Keywords from './components/SearchForm/components/Keywords';
import SearchTypes from './components/SearchForm/components/SearchTypes';
import RecentSearches from './components/SearchForm/components/RecentSearches';
import { getKeywordsVisibility, getQueryDataStatus } from './common/utils';

const SearchTabs = lazy(() => import('./components/SearchTabs'));
const SearchMovies = lazy(() => import('./components/SearchMovies'));
const SearchPeople = lazy(() => import('./components/SearchPeople'));
const SearchTVShows = lazy(() => import('./components/SearchTVShows'));

const defaultValues: SearchFormType = { query: '', searchTypes: [] };

const OriginalSearch: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { isGuest, spacing } = useLayoutContext();

	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const id = useSelector((state) => state.users.data.activeUser.data.id);
	const recentSearches = useSelector((state) => state.users.data.activeUser.data.recentSearches || []);

	const [isKeywordsVisible, setIsKeywordsVisible] = useBoolean();
	const [isSearchInputFocused, setIsSearchInputFocused] = useBoolean(defaultIsFocused);
	const [isSubmitQuerySuccessful, setIsSubmitQuerySuccessful] = useBoolean();

	const [queryDataStatus, setQueryDataStatus] = useState<SearchQueryDataStatus>(defaultQueryDataStatus);
	const queryDataStatusDebounced = useDebounce<SearchQueryDataStatus>(queryDataStatus, 1000);

	const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

	const [keywords, setKeywords] = useState<UseKeywordsInfiniteQueryResponse>();
	const keywordsDebounced = useDebounce<Undefinable<UseKeywordsInfiniteQueryResponse>>(keywords, 1000);

	const [movies, setMovies] = useState<UseSearchInfiniteQueryResponse<'movie'>>();
	const moviesDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'movie'>>>(movies, 1000);

	const [shows, setShows] = useState<UseSearchInfiniteQueryResponse<'tv'>>();
	const showsDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'tv'>>>(shows, 1000);

	const [people, setPeople] = useState<UseSearchInfiniteQueryResponse<'person'>>();
	const peopleDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'person'>>>(people, 1000);

	const [companies, setCompanies] = useState<UseSearchInfiniteQueryResponse<'company'>>();
	const companiesDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'company'>>>(companies, 1000);

	const [collections, setCollections] = useState<UseSearchInfiniteQueryResponse<'collection'>>();
	const collectionsDebounced = useDebounce<Undefinable<UseSearchInfiniteQueryResponse<'collection'>>>(
		collections,
		1000
	);

	const form = useForm<SearchFormType>({ defaultValues, mode: 'all' });

	const { control, reset } = form;

	const watchQuery = useWatch({ control, name: 'query' });
	const watchQueryDebounced = useDebounce(watchQuery, 1000);
	const watchSearchTypes = useWatch({ control, name: 'searchTypes' });

	// Query Keywords
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

	const { refetch: refetchKeywordsInfiniteQuery, remove: removeKeywordsInfiniteQuery } = keywordsInfiniteQuery;

	// Searching Movies
	useSearchInfiniteQuery<'movie'>({
		props: { mediaType: 'movie', query: watchQuery },
		options: {
			enabled:
				(watchSearchTypes.length === 0 || watchSearchTypes.some((type) => type === 'movie')) &&
				isSubmitQuerySuccessful,
			onSuccess: (data) => {
				let movies: PartialMovie[] = [];

				setIsSubmitQuerySuccessful.off();

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

	// Searching TV Shows
	useSearchInfiniteQuery<'tv'>({
		props: { mediaType: 'tv', query: watchQuery },
		options: {
			enabled:
				(watchSearchTypes.length === 0 || watchSearchTypes.some((type) => type === 'tv')) &&
				isSubmitQuerySuccessful,
			onSuccess: (data) => {
				let shows: PartialTV[] = [];

				setIsSubmitQuerySuccessful.off();

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

	// Searching People
	useSearchInfiniteQuery<'person'>({
		props: { mediaType: 'person', query: watchQuery },
		options: {
			enabled:
				(watchSearchTypes.length === 0 || watchSearchTypes.some((type) => type === 'person')) &&
				isSubmitQuerySuccessful,
			onSuccess: (data) => {
				let people: PartialPerson[] = [];

				setIsSubmitQuerySuccessful.off();

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

	// Searching Companies
	useSearchInfiniteQuery<'company'>({
		props: { mediaType: 'company', query: watchQuery },
		options: {
			enabled:
				(watchSearchTypes.length === 0 || watchSearchTypes.some((type) => type === 'company')) &&
				isSubmitQuerySuccessful,
			onSuccess: (data) => {
				let companies: PartialCompany[] = [];

				setIsSubmitQuerySuccessful.off();

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

	// Searching Collections
	useSearchInfiniteQuery<'collection'>({
		props: { mediaType: 'collection', query: watchQuery },
		options: {
			enabled:
				(watchSearchTypes.length === 0 || watchSearchTypes.some((type) => type === 'collection')) &&
				isSubmitQuerySuccessful,
			onSuccess: (data) => {
				let collections: Collection[] = [];

				setIsSubmitQuerySuccessful.off();

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

	const handleKeywordsVisibility = useCallback(
		debounce((): void => {
			const isVisible = getKeywordsVisibility({
				location,
				watchQuery: watchQueryDebounced,
				isSearchInputFocused,
				total: keywordsDebounced?.total_results
			});

			setIsKeywordsVisible[isVisible ? 'on' : 'off']();
		}, 250),
		[location, watchQueryDebounced, isSearchInputFocused, keywordsDebounced, getKeywordsVisibility]
	);

	const handleGetKeywords = useCallback((): void => {
		if (!isSubmitQuerySuccessful) {
			removeKeywordsInfiniteQuery();

			if (watchQueryDebounced.length > 0) {
				setTimeout(() => refetchKeywordsInfiniteQuery(), 250);
			}
		}
	}, [isSubmitQuerySuccessful, watchQueryDebounced, removeKeywordsInfiniteQuery, refetchKeywordsInfiniteQuery]);

	const handleSearchParams = useCallback((): void => {
		const search = qs.parse(location.search);
		const query = search && search.query && typeof search.query === 'string' ? search.query : '';
		const searchTypes =
			search && search.searchTypes && Array.isArray(search.searchTypes) ? compact(search.searchTypes) : [];

		if (query) {
			setTimeout(() => handleSubmitQuery({ query, searchTypes }), 250);
		}
	}, [location]);

	const handleQueryData = useCallback(
		debounce((): void => {
			setQueryDataStatus(
				getQueryDataStatus({
					movies: moviesDebounced?.total_results,
					shows: showsDebounced?.total_results,
					people: peopleDebounced?.total_results,
					companies: companiesDebounced?.total_results,
					collections: collectionsDebounced?.total_results
				})
			);
		}, 1000),
		[moviesDebounced, showsDebounced, peopleDebounced, companiesDebounced, collectionsDebounced, getQueryDataStatus]
	);

	const handleSubmitQuery = useCallback(
		debounce(({ query, searchTypes }: SearchFormType): void => {
			navigate({ ...location, search: qs.stringify({ query, searchTypes }) });

			reset({ query, searchTypes });

			setActiveTab(0);

			setQueryDataStatus('hidden');

			setKeywords(undefined);

			setMovies(undefined);
			setShows(undefined);
			setPeople(undefined);
			setCollections(undefined);
			setCompanies(undefined);

			if (!isGuest) {
				const newRecentSearches: UserSearch = {
					id: uuid(),
					label: query,
					searchedAt: dayjs(new Date()).toISOString(),
					searchTypes
				};
				const updatedRecentSearches: UserSearch[] = uniqBy([...recentSearches, newRecentSearches], 'id');

				dispatch(setUserRecentSearches({ id, data: [...updatedRecentSearches] }));
			}

			setTimeout(() => setIsSubmitQuerySuccessful.on(), 250);
		}, 750),
		[location, id, recentSearches]
	);

	const handleClearQuery = useCallback((): void => {
		reset({ ...defaultValues });
	}, [defaultValues]);

	const handleClearAllQuery = useCallback((): void => {
		handleClearQuery();

		setIsKeywordsVisible.off();
		setIsSearchInputFocused.on();
		setIsSubmitQuerySuccessful.off();

		setQueryDataStatus('hidden');

		setActiveTab(0);

		setKeywords(undefined);

		setMovies(undefined);
		setShows(undefined);
		setPeople(undefined);
		setCompanies(undefined);
		setCollections(undefined);
	}, [handleClearQuery]);

	useUpdateEffect(() => {
		handleKeywordsVisibility();
	}, [location.search, watchQueryDebounced, isSearchInputFocused, keywordsDebounced]);

	useUpdateEffect(() => handleGetKeywords(), [watchQueryDebounced]);

	useUpdateEffect(() => {
		handleQueryData();
	}, [moviesDebounced, showsDebounced, peopleDebounced, companiesDebounced, collectionsDebounced]);

	useEffectOnce(() => {
		if (location.search.length > 0) {
			handleSearchParams();
		} else {
			setIsSearchInputFocused.on();
		}
	});

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => <Text {...props}>Search</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>Search anything from Movies, TV Shows, People, Collections or Companies</Text>
				)}
				// actions={<DisplayMode />}
				direction='row'
				p={spacing}
			/>
			<PageBody p={spacing}>
				<VStack width='100%' divider={<Divider colorMode={colorMode} mb='0px !important' />} spacing={spacing}>
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
									onClearQuery={handleClearQuery}
									onSubmitQuery={handleSubmitQuery}
								/>
							),
							collapsible: (
								<AnimatePresence exitBeforeEnter initial={false}>
									{isKeywordsVisible ? (
										<Fade key='search-form-collapsible-content-1' in style={{ width: '100%' }}>
											<Keywords
												query={keywordsInfiniteQuery}
												keywords={keywordsDebounced}
												onKeywordClick={({ name = '' }) =>
													handleSubmitQuery({
														query: name,
														searchTypes: watchSearchTypes
													})
												}
											/>
										</Fade>
									) : (
										<Fade key='search-form-collapsible-content-2' in style={{ width: '100%' }}>
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
										queryDataStatusDebounced === 'single' || queryDataStatusDebounced === 'multiple'
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
						<QueryEmpty color={color} colorMode={colorMode}>
							<QueryEmptyStack>
								<QueryEmptyBody>
									<QueryEmptyTitle />
									<QueryEmptySubtitle>
										{getEmptySubtitle({
											type: 'empty',
											label: `Unfortunately couldn't find anything that match with the query "${watchQueryDebounced}"`
										})}
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
							<Center width='100%'>
								{queryDataStatusDebounced === 'multiple' ? (
									<Suspense fallback={<SearchDummyTabs />}>
										<SearchTabs
											activeTab={activeTab}
											movies={moviesDebounced}
											shows={showsDebounced}
											people={peopleDebounced}
											companies={companiesDebounced}
											collections={collectionsDebounced}
											onChange={({ index }) => setActiveTab(index)}
										/>
									</Suspense>
								) : (
									<Fragment>
										{(moviesDebounced?.total_results || 0) > 0 && (
											<Suspense fallback={<SearchDummyMovies />}>
												<SearchMovies query={watchQueryDebounced} />
											</Suspense>
										)}

										{(showsDebounced?.total_results || 0) > 0 && (
											<Suspense fallback={<SearchDummyTVShows />}>
												<SearchTVShows query={watchQueryDebounced} />
											</Suspense>
										)}

										{(peopleDebounced?.total_results || 0) > 0 && (
											<Suspense fallback={<SearchDummyPeople />}>
												<SearchPeople query={watchQueryDebounced} />
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
	);
};

export default OriginalSearch;
