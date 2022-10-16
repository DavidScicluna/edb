import { FC, useState, useCallback, useEffect, lazy } from 'react';

import { useLocation } from 'react-router';

import { TabsOnChangeProps, TabListTab, Tabs, TabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { compact, debounce, includes } from 'lodash';
import { useEffectOnce } from 'usehooks-ts';

import { activeTab as defaultActiveTab } from '../../common/data/defaultPropValues';
import { useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../common/utils';
import { SearchForm, SearchMediaTypes } from '../../types';
import { Suspense } from '../../../../../components';
import { getQueryFromSearch } from '../../common/utils';
import SearchDummyMoviesTab from '../SearchDummyMovies';
import SearchDummyPeopleTab from '../SearchDummyPeople';
import SearchDummyTVShowsTab from '../SearchDummyTVShows';
import DummyAllTab from '../SearchDummyTabs/components/DummyAllTab';

import TabBadge from './components/TabBadge';
import TabIcon from './components/TabIcon';
import { SearchTabsProps } from './types';
import { getMediaTypeIndex } from './common/utils';

const AllTab = lazy(() => import('./components/AllTab'));
const MoviesTab = lazy(() => import('../SearchMovies'));
const PeopleTab = lazy(() => import('../SearchPeople'));
const TVShowsTab = lazy(() => import('../SearchTVShows'));

const SearchTabs: FC<SearchTabsProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const location = useLocation();

	const { activeTab = defaultActiveTab, movies, shows, people, companies, collections, onChange } = props;

	const [query, setQuery] = useState<SearchForm['query']>(getQueryFromSearch({ location }));

	const [searchMediaTypes, setSearchMediaTypes] = useState<SearchMediaTypes>([]);

	const [total, setTotal] = useState<number>(0);

	const handleTabChange = useCallback(
		(props: TabsOnChangeProps) => {
			if (onChange) {
				document.scrollingElement?.scrollTo(0, 0);

				setTimeout(() => onChange(props), 500);
			}
		},
		[document, onChange]
	);

	const handleCheckMediaTypes = useCallback(() => {
		const searchMediaTypes: SearchMediaTypes = [];
		let total = 0;

		if ((movies?.total_results || 0) > 0) {
			searchMediaTypes.push('movie');
			total = total + (movies?.total_results || 0);
		}

		if ((shows?.total_results || 0) > 0) {
			searchMediaTypes.push('tv');
			total = total + (shows?.total_results || 0);
		}

		if ((people?.total_results || 0) > 0) {
			searchMediaTypes.push('person');
			total = total + (people?.total_results || 0);
		}

		if ((companies?.total_results || 0) > 0) {
			searchMediaTypes.push('company');
			total = total + (companies?.total_results || 0);
		}

		if ((collections?.total_results || 0) > 0) {
			searchMediaTypes.push('collection');
			total = total + (collections?.total_results || 0);
		}

		setSearchMediaTypes([...searchMediaTypes]);
		setTotal(total);
	}, [movies, shows, people, companies, collections]);

	useEffectOnce(() => handleCheckMediaTypes());

	useEffect(() => setQuery(getQueryFromSearch({ location })), [location.search]);

	return (
		<Tabs
			width='100%'
			color={color}
			colorMode={colorMode}
			activeTab={activeTab}
			onChange={handleTabChange}
			size='lg'
		>
			<VStack width='100%' spacing={spacing}>
				<TabList
					tabs={compact([
						{
							label: 'All',
							renderRight:
								total > 0
									? ({ color, ...rest }) => (
											<TabBadge
												{...rest}
												color={activeTab === 0 ? color : 'gray'}
												total={total}
												variant={activeTab === 0 ? 'contained' : 'outlined'}
											/>
									  )
									: undefined
						} as TabListTab,

						includes(searchMediaTypes, 'movie')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'movie' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													searchMediaTypes,
													mediaType: 'movie'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										movies && movies.total_results
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'movie'
															})
																? color
																: 'gray'
														}
														total={movies.total_results}
														variant={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'movie'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null,

						includes(searchMediaTypes, 'tv')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'tv' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													searchMediaTypes,
													mediaType: 'tv'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										shows && shows.total_results
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'tv'
															})
																? color
																: 'gray'
														}
														total={shows.total_results}
														variant={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'tv'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null,

						includes(searchMediaTypes, 'person')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'person' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													searchMediaTypes,
													mediaType: 'person'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										people && people.total_results
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'person'
															})
																? color
																: 'gray'
														}
														total={people.total_results}
														variant={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'person'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null,

						includes(searchMediaTypes, 'company')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'company' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'company' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													searchMediaTypes,
													mediaType: 'company'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										companies && companies.total_results
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'company'
															})
																? color
																: 'gray'
														}
														total={companies.total_results}
														variant={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'company'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null,

						includes(searchMediaTypes, 'collection')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'collection' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													searchMediaTypes,
													mediaType: 'collection'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										collections && collections.total_results
											? ({ color, ...rest }) => (
													<TabBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'collection'
															})
																? color
																: 'gray'
														}
														total={collections.total_results}
														variant={
															activeTab ===
															getMediaTypeIndex({
																searchMediaTypes,
																mediaType: 'collection'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null
					])}
				/>

				<TabPanels>
					<Suspense fallback={<DummyAllTab />}>
						<AllTab
							query={query}
							movies={movies}
							shows={shows}
							people={people}
							companies={companies}
							collections={collections}
							onSetActiveTab={
								onChange
									? ({ mediaType }) =>
											onChange({
												index: getMediaTypeIndex({
													searchMediaTypes,
													mediaType
												})
											})
									: undefined
							}
						/>
					</Suspense>

					<Suspense fallback={<SearchDummyMoviesTab />}>
						<MoviesTab query={query} />
					</Suspense>

					<Suspense fallback={<SearchDummyTVShowsTab />}>
						<TVShowsTab query={query} />
					</Suspense>

					<Suspense fallback={<SearchDummyPeopleTab />}>
						<PeopleTab query={query} />
					</Suspense>

					{/* <Suspense fallback={<TrendingDummyTV />}>
						<TrendingTV />
					</Suspense>

					<Suspense fallback={<TrendingDummyPeople />}>
						<TrendingPeople />
					</Suspense> */}
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default SearchTabs;