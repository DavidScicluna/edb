import { FC, useState, lazy } from 'react';

import { TabListTab, useDebounce, Tabs, TabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { compact, includes } from 'lodash';
import { useEffectOnce } from 'usehooks-ts';

import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../common/utils';
import { Suspense, TabDisplayMode, TabIcon, TotalBadge } from '../../../../../components';
import DummyMoviesTab from '../../../components/RecentlyViewedDummyMovies';
import DummyPeopleTab from '../../../components/RecentlyViewedDummyPeople';
import DummyTVShowsTab from '../../../components/RecentlyViewedDummyTVShows';
import DummyCollectionsTab from '../../../components/RecentlyViewedDummyCollections';
import DummyAllTab from '../../../components/RecentlyViewedDummyTabs/components/DummyAllTab';
import { RecentlyViewedMediaTypes } from '../../types';

import { getMediaTypeIndex } from './common/utils';

const AllTab = lazy(() => import('./components/AllTab'));
const MoviesTab = lazy(() => import('../RecentlyViewedMovies'));
const PeopleTab = lazy(() => import('../RecentlyViewedPeople'));
const TVShowsTab = lazy(() => import('../RecentlyViewedTVShows'));
const CollectionsTab = lazy(() => import('../RecentlyViewedCollections'));

const RecentlyViewedTabs: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const recentlyViewed = useSelector((state) => state.users.data.activeUser.data.recentlyViewed);

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const [mediaTypes, setMediaTypes] = useState<RecentlyViewedMediaTypes>([]);

	const [total, setTotal] = useState<number>(0);

	const handleCheckMediaTypes = () => {
		const searchMediaTypes: RecentlyViewedMediaTypes = [];
		let total = 0;

		if (recentlyViewed.movie.length > 0) {
			searchMediaTypes.push('movie');
			total = total + recentlyViewed.movie.length;
		}

		if (recentlyViewed.tv.length > 0) {
			searchMediaTypes.push('tv');
			total = total + recentlyViewed.tv.length;
		}

		if (recentlyViewed.person.length > 0) {
			searchMediaTypes.push('person');
			total = total + recentlyViewed.person.length;
		}

		if (recentlyViewed.collection.length > 0) {
			searchMediaTypes.push('collection');
			total = total + recentlyViewed.collection.length;
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
			activeTab={activeTabDebounced}
			onChange={({ index }) => setActiveTab(index)}
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
												color={activeTabDebounced === 0 ? color : 'gray'}
												total={total}
												variant={activeTabDebounced === 0 ? 'contained' : 'outlined'}
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
												activeTabDebounced ===
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
										recentlyViewed.movie.length > 0
											? ({ color, ...rest }) => (
													<TotalBadge
														{...rest}
														color={
															activeTabDebounced ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'movie'
															})
																? color
																: 'gray'
														}
														total={recentlyViewed.movie.length}
														variant={
															activeTabDebounced ===
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
												activeTabDebounced ===
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
										recentlyViewed.tv.length > 0
											? ({ color, ...rest }) => (
													<TotalBadge
														{...rest}
														color={
															activeTabDebounced ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'tv'
															})
																? color
																: 'gray'
														}
														total={recentlyViewed.tv.length}
														variant={
															activeTabDebounced ===
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
												activeTabDebounced ===
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
										recentlyViewed.person.length > 0
											? ({ color, ...rest }) => (
													<TotalBadge
														{...rest}
														color={
															activeTabDebounced ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'person'
															})
																? color
																: 'gray'
														}
														total={recentlyViewed.person.length}
														variant={
															activeTabDebounced ===
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
												activeTabDebounced ===
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
										recentlyViewed.collection.length > 0
											? ({ color, ...rest }) => (
													<TotalBadge
														{...rest}
														color={
															activeTabDebounced ===
															getMediaTypeIndex({
																mediaTypes: mediaTypes,
																mediaType: 'collection'
															})
																? color
																: 'gray'
														}
														total={recentlyViewed.collection.length}
														variant={
															activeTabDebounced ===
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
							: null
					])}
					renderRight={activeTabDebounced !== 0 ? () => <TabDisplayMode /> : undefined}
				/>

				<TabPanels>
					{compact([
						<Suspense key='ds-edb-RecentlyViewed-RecentlyViewedTabs-AllTab' fallback={<DummyAllTab />}>
							<AllTab mediaTypes={mediaTypes} onSetActiveTab={({ index }) => setActiveTab(index)} />
						</Suspense>,

						includes(mediaTypes, 'movie') && (
							<Suspense
								key='ds-edb-RecentlyViewed-RecentlyViewedTabs-MoviesTab'
								fallback={<DummyMoviesTab />}
							>
								<MoviesTab />
							</Suspense>
						),

						includes(mediaTypes, 'tv') && (
							<Suspense
								key='ds-edb-RecentlyViewed-RecentlyViewedTabs-TVShowsTab'
								fallback={<DummyTVShowsTab />}
							>
								<TVShowsTab />
							</Suspense>
						),

						includes(mediaTypes, 'person') && (
							<Suspense
								key='ds-edb-RecentlyViewed-RecentlyViewedTabs-PeopleTab'
								fallback={<DummyPeopleTab />}
							>
								<PeopleTab />
							</Suspense>
						),

						includes(mediaTypes, 'collection') && (
							<Suspense
								key='ds-edb-RecentlyViewed-RecentlyViewedTabs-CollectionsTab'
								fallback={<DummyCollectionsTab />}
							>
								<CollectionsTab />
							</Suspense>
						)
					])}
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default RecentlyViewedTabs;
