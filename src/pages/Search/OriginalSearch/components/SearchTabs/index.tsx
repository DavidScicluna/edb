import { FC, useState, lazy } from 'react';

import { TabListTab, Tabs, TabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { compact, includes } from 'lodash';
import { useEffectOnce } from 'usehooks-ts';

import { activeTab as defaultActiveTab } from '../../common/data/defaultPropValues';
import { useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../common/utils';
import { Suspense, TabDisplayMode, TabIcon, TotalBadge } from '../../../../../components';
import DummyMoviesTab from '../SearchDummyMovies';
import DummyPeopleTab from '../SearchDummyPeople';
import DummyTVShowsTab from '../SearchDummyTVShows';
import DummyCollectionsTab from '../SearchDummyCollections';
import DummyCompaniesTab from '../SearchDummyCompanies';
import DummyAllTab from '../SearchDummyTabs/components/DummyAllTab';
import { MediaType } from '../../../../../common/types';
import { useSearchContext } from '../../common/hooks';

import { SearchTabsProps } from './types';
import { getMediaTypeIndex } from './common/utils';


const AllTab = lazy(() => import('./components/AllTab'));
const MoviesTab = lazy(() => import('../SearchMovies'));
const PeopleTab = lazy(() => import('../SearchPeople'));
const TVShowsTab = lazy(() => import('../SearchTVShows'));
const CollectionsTab = lazy(() => import('../SearchCollections'));
const CompaniesTab = lazy(() => import('../SearchCompanies'));

const SearchTabs: FC<SearchTabsProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { onSetActiveTab } = useSearchContext();

	const { activeTab = defaultActiveTab, movie, tv, person, collection, company } = props;
	const { data: movies } = movie;
	const { data: shows } = tv;
	const { data: people } = person;
	const { data: collections } = collection;
	const { data: companies } = company;

	const [mediaTypes, setMediaTypes] = useState<MediaType[]>([]);

	const [total, setTotal] = useState<number>(0);

	const handleCheckMediaTypes = () => {
		const searchMediaTypes: MediaType[] = [];
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

		if ((collections?.total_results || 0) > 0) {
			searchMediaTypes.push('collection');
			total = total + (collections?.total_results || 0);
		}

		if ((companies?.total_results || 0) > 0) {
			searchMediaTypes.push('company');
			total = total + (companies?.total_results || 0);
		}

		setMediaTypes([...searchMediaTypes]);
		setTotal(total);
	};

	useEffectOnce(() => handleCheckMediaTypes());

	return (
		<Tabs
			width='100%'
			color={color}
			colorMode={colorMode}
			activeTab={activeTab}
			onChange={onSetActiveTab}
			size='xl'
		>
			<VStack width='100%' spacing={spacing}>
				<TabList
					tabs={compact([
						{
							label: 'All',
							renderRight:
								total > 0
									? ({ color, ...rest }) => (
											<TotalBadge
												{...rest}
												color={activeTab === 0 ? color : 'gray'}
												total={total}
												variant={activeTab === 0 ? 'contained' : 'outlined'}
											/>
									  )
									: undefined
						} as TabListTab,

						includes(mediaTypes, 'movie')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'movie' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes: mediaTypes,
													mediaType: 'movie'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										(movies?.total_results || 0) > 0
											? ({ color, ...rest }) => (
													<TotalBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'movie'
															})
																? color
																: 'gray'
														}
														total={movies?.total_results || 0}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
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

						includes(mediaTypes, 'tv')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'tv' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes: mediaTypes,
													mediaType: 'tv'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										(shows?.total_results || 0) > 0
											? ({ color, ...rest }) => (
													<TotalBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'tv'
															})
																? color
																: 'gray'
														}
														total={shows?.total_results || 0}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
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

						includes(mediaTypes, 'person')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'person' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes: mediaTypes,
													mediaType: 'person'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										(people?.total_results || 0) > 0
											? ({ color, ...rest }) => (
													<TotalBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'person'
															})
																? color
																: 'gray'
														}
														total={people?.total_results || 0}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
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

						includes(mediaTypes, 'collection')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'collection' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes: mediaTypes,
													mediaType: 'collection'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										(collections?.total_results || 0) > 0
											? ({ color, ...rest }) => (
													<TotalBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'collection'
															})
																? color
																: 'gray'
														}
														total={collections?.total_results || 0}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'collection'
															})
																? 'contained'
																: 'outlined'
														}
													/>
											  )
											: undefined
							  } as TabListTab)
							: null,

						includes(mediaTypes, 'company')
							? ({
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'company' }),
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'company' })}
											category={
												activeTab ===
												getMediaTypeIndex({
													mediaTypes: mediaTypes,
													mediaType: 'company'
												})
													? 'filled'
													: 'outlined'
											}
										/>
									),
									renderRight:
										(companies?.total_results || 0) > 0
											? ({ color, ...rest }) => (
													<TotalBadge
														{...rest}
														color={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'company'
															})
																? color
																: 'gray'
														}
														total={companies?.total_results || 0}
														variant={
															activeTab ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'company'
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
					renderRight={activeTab !== 0 ? () => <TabDisplayMode /> : undefined}
				/>

				<TabPanels>
					{compact([
						<Suspense key='ds-edb-Search-SearchTabs-AllTab' fallback={<DummyAllTab />}>
							<AllTab
								mediaTypes={mediaTypes}
								movies={movies}
								shows={shows}
								people={people}
								companies={companies}
								collections={collections}
							/>
						</Suspense>,

						includes(mediaTypes, 'movie') && (
							<Suspense key='ds-edb-Search-SearchTabs-MoviesTab' fallback={<DummyMoviesTab />}>
								<MoviesTab query={movie.query} data={movies} />
							</Suspense>
						),

						includes(mediaTypes, 'tv') && (
							<Suspense key='ds-edb-Search-SearchTabs-TVShowsTab' fallback={<DummyTVShowsTab />}>
								<TVShowsTab query={tv.query} data={shows} />
							</Suspense>
						),

						includes(mediaTypes, 'person') && (
							<Suspense key='ds-edb-Search-SearchTabs-PeopleTab' fallback={<DummyPeopleTab />}>
								<PeopleTab query={person.query} data={people} />
							</Suspense>
						),

						includes(mediaTypes, 'collection') && (
							<Suspense key='ds-edb-Search-SearchTabs-CollectionsTab' fallback={<DummyCollectionsTab />}>
								<CollectionsTab query={collection.query} data={collections} />
							</Suspense>
						),

						includes(mediaTypes, 'company') && (
							<Suspense key='ds-edb-Search-SearchTabs-CompaniesTab' fallback={<DummyCompaniesTab />}>
								<CompaniesTab query={company.query} data={companies} />
							</Suspense>
						)
					])}
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default SearchTabs;
