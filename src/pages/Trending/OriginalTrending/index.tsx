import { FC, useState, lazy } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { Undefinable, TabsOnChangeProps, Tabs, TabList, TabPanels } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { uniqBy } from 'lodash';

import Page from '../../../containers/Page';
import PageHeader from '../../../containers/Page/components/PageHeader';
import PageBody from '../../../containers/Page/components/PageBody';
import { useDebounce, useUserTheme } from '../../../common/hooks';
import { formatMediaType, formatMediaTypeLabel, getMediaTypeIcon } from '../../../common/utils';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import { Suspense, TabIcon } from '../../../components';
import TrendingDummyMoviesTab from '../components/TrendingDummyMoviesTab';
import TrendingDummyPeopleTab from '../components/TrendingDummyPeopleTab';
import TrendingDummyTVShowsTab from '../components/TrendingDummyTVShowsTab';
import { getActiveTabFromHash } from '../common/utils';
import useTrendingInfiniteQuery, {
	UseTrendingInfiniteQueryResponse
} from '../../../common/queries/useTrendingInfiniteQuery';
import { PartialMovie } from '../../../common/types/movie';
import { PartialTV } from '../../../common/types/tv';
import { PartialPerson } from '../../../common/types/person';
import TrendingDummyAllTab from '../components/TrendingDummyAllTab';

import { TrendingMediaTypes } from './types';
import { getMediaTypeIndex } from './common/utils';
import TrendingDisplayMode from './components/TrendingDisplayMode';

const TrendingAllTab = lazy(() => import('./components/TrendingAllTab'));
const TrendingMoviesTab = lazy(() => import('./components/TrendingMoviesTab'));
const TrendingPeopleTab = lazy(() => import('./components/TrendingPeopleTab'));
const TrendingTVShowsTab = lazy(() => import('./components/TrendingTVShowsTab'));

export const trendingMediaTypes: TrendingMediaTypes = ['movie', 'tv', 'person'];

const Trending: FC = () => {
	const { color, colorMode } = useUserTheme();

	const location = useLocation();
	const navigate = useNavigate();

	const { spacing } = useLayoutContext();

	const [activeTab, setActiveTab] = useState<number>(getActiveTabFromHash({ location }) || 0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const [movies, setMovies] = useState<UseTrendingInfiniteQueryResponse<'movie'>>();
	const moviesDebounced = useDebounce<Undefinable<UseTrendingInfiniteQueryResponse<'movie'>>>(movies, 'slow');

	const [shows, setShows] = useState<UseTrendingInfiniteQueryResponse<'tv'>>();
	const showsDebounced = useDebounce<Undefinable<UseTrendingInfiniteQueryResponse<'tv'>>>(shows, 'slow');

	const [people, setPeople] = useState<UseTrendingInfiniteQueryResponse<'person'>>();
	const peopleDebounced = useDebounce<Undefinable<UseTrendingInfiniteQueryResponse<'person'>>>(people, 'slow');

	const trendingMoviesInfiniteQuery = useTrendingInfiniteQuery<'movie'>({
		props: { mediaType: 'movie', time: 'week' },
		options: {
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

	const { isError: isTrendingMoviesError } = trendingMoviesInfiniteQuery;

	const trendingTVShowsInfiniteQuery = useTrendingInfiniteQuery<'tv'>({
		props: { mediaType: 'tv', time: 'week' },
		options: {
			onSuccess: (data) => {
				let shows: PartialTV[] = [];

				data.pages.forEach((page) => {
					shows = [...shows, ...(page.results || [])];
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

	const { isError: isTrendingTVShowsError } = trendingTVShowsInfiniteQuery;

	const trendingPeopleInfiniteQuery = useTrendingInfiniteQuery<'person'>({
		props: { mediaType: 'person', time: 'week' },
		options: {
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

	const { isError: isTrendingPeopleError } = trendingPeopleInfiniteQuery;

	const handleSubtitle = (): string => {
		if (activeTab > 0) {
			const activeMediaType = formatMediaTypeLabel({
				type: 'multiple',
				mediaType: trendingMediaTypes[activeTabDebounced - 1]
			});

			return `A list containing the most trending ${activeMediaType} this week.`;
		} else {
			return `A list containing the most trending ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'movie'
			})}, ${formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })} & ${formatMediaTypeLabel({
				type: 'multiple',
				mediaType: 'person'
			})} this week`;
		}
	};

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		if (index > 0) {
			const activeMediaType = formatMediaType({ mediaType: trendingMediaTypes[index - 1] });

			navigate({ ...location, hash: activeMediaType });
		} else {
			navigate({ ...location, hash: '' });
		}

		setTimeout(() => window.scrollTo(0, 0), 1000);
	};

	const handleSetActiveTab = (): void => {
		setActiveTab(getActiveTabFromHash({ location }) || 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => <Text {...props}>Trending</Text>}
				renderSubtitle={(props) => <Text {...props}>{handleSubtitle()}</Text>}
				direction='row'
				spacing={spacing}
				px={spacing}
				py={spacing * 2}
			/>
			<PageBody px={spacing} pb={spacing}>
				<Tabs
					width='100%'
					color={color}
					colorMode={colorMode}
					activeTab={activeTabDebounced}
					onChange={handleTabChange}
					size='lg'
				>
					<VStack width='100%' spacing={spacing}>
						<TabList
							tabs={[
								{ label: 'All' },

								{
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
									isDisabled: isTrendingMoviesError || (movies?.total_results || 0) === 0,
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'movie' })}
											category={
												activeTabDebounced === getMediaTypeIndex({ mediaType: 'movie' })
													? 'filled'
													: 'outlined'
											}
										/>
									)
								},

								{
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
									isDisabled: isTrendingTVShowsError || (shows?.total_results || 0) === 0,
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'tv' })}
											category={
												activeTabDebounced === getMediaTypeIndex({ mediaType: 'tv' })
													? 'filled'
													: 'outlined'
											}
										/>
									)
								},

								{
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
									isDisabled: isTrendingPeopleError || (people?.total_results || 0) === 0,
									renderLeft: (props) => (
										<TabIcon
											{...props}
											icon={getMediaTypeIcon({ mediaType: 'person' })}
											category={
												activeTabDebounced === getMediaTypeIndex({ mediaType: 'person' })
													? 'filled'
													: 'outlined'
											}
										/>
									)
								}
							]}
							renderRight={activeTabDebounced !== 0 ? () => <TrendingDisplayMode /> : undefined}
						/>

						<TabPanels>
							<Suspense fallback={<TrendingDummyAllTab />}>
								<TrendingAllTab
									moviesInfiniteQuery={trendingMoviesInfiniteQuery}
									movies={moviesDebounced}
									tvShowsInfiniteQuery={trendingTVShowsInfiniteQuery}
									shows={showsDebounced}
									peopleInfiniteQuery={trendingPeopleInfiniteQuery}
									people={peopleDebounced}
									onTabChange={({ mediaType }) =>
										handleTabChange({ index: getMediaTypeIndex({ mediaType }) })
									}
								/>
							</Suspense>

							<Suspense fallback={<TrendingDummyMoviesTab />}>
								<TrendingMoviesTab query={trendingMoviesInfiniteQuery} movies={moviesDebounced} />
							</Suspense>

							<Suspense fallback={<TrendingDummyTVShowsTab />}>
								<TrendingTVShowsTab query={trendingTVShowsInfiniteQuery} shows={showsDebounced} />
							</Suspense>

							<Suspense fallback={<TrendingDummyPeopleTab />}>
								<TrendingPeopleTab query={trendingPeopleInfiniteQuery} people={peopleDebounced} />
							</Suspense>
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default Trending;
