import { FC, createContext, useState, lazy } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router';

import {
	TabsOnChangeProps,
	useTheme,
	useDebounce,
	Tabs,
	TabList,
	TabPanels,
	Skeleton
} from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import episodeTabs, {
	castTabIndex,
	guestStarsTabIndex,
	crewTabIndex,
	photosTabIndex,
	videosTabIndex
} from '../common/data/tabs';
import ViewDummyPoster from '../../../components/ViewDummyPoster';
import { method as defaultOnSetActiveTab } from '../../../../../common/data/defaultPropValues';
import { useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import {
	useMediaTypeQuery,
	useTVShowEpisodeCreditsQuery,
	useTVShowEpisodeImagesQuery,
	useTVShowEpisodeQuery,
	useTVShowEpisodeVideosQuery
} from '../../../../../common/queries';
import Page from '../../../../../containers/Page';
import PageHeader from '../../../../../containers/Page/components/PageHeader';
import PageBody from '../../../../../containers/Page/components/PageBody';
import { Suspense, TabIcon, TotalBadge } from '../../../../../components';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyCastTab from '../components/DummyCastTab';
import DummyGuestStarsTab from '../components/DummyGuestStarsTab';
import DummyCrewTab from '../components/DummyCrewTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import DummyVideosTab from '../components/DummyVideosTab';
import EpisodesDummyInfo from '../components/EpisodesDummyInfo';
import ViewDummyRating from '../../../components/ViewDummyRating';
import ViewRating from '../../../components/ViewRating';
import EpisodesDummyActions from '../components/EpisodesDummyActions';

import { EpisodeContext as EpisodeContextType, EpisodeParams } from './types';
import EpisodeInfo from './components/EpisodeInfo';
import EpisodePoster from './components/EpisodePoster';
import EpisodeActions from './components/EpisodeActions';

const OverviewTab = lazy(() => import('./components/OverviewTab'));
const CastTab = lazy(() => import('./components/CastTab'));
const CrewTab = lazy(() => import('./components/CrewTab'));
const GuestStarsTab = lazy(() => import('./components/GuestStarsTab'));
const PhotosTab = lazy(() => import('./components/PhotosTab'));
const VideosTab = lazy(() => import('./components/VideosTab'));

export const EpisodeContext = createContext<EpisodeContextType>({ onSetActiveTab: defaultOnSetActiveTab });

const Episode: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isGuest, spacing } = useLayoutContext();

	const { id, season, episode } = useParams<EpisodeParams>();
	const location = useLocation();
	const navigate = useNavigate();

	// TODO: Go over all useDebounce and check that we are actually using the debounced value not the state!
	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const showQuery = useMediaTypeQuery<'tv'>({
		props: { mediaType: 'tv', id: Number(id) },
		config: { params: { append_to_response: 'content_ratings' } }
	});

	const episodeQuery = useTVShowEpisodeQuery({
		props: { id: Number(id), season: Number(season), episode: Number(episode) }
	});

	const { data: fullEpisode, isFetching: isEpisodeFetching, isLoading: isEpisodeLoading } = episodeQuery;
	const { name, vote_average, vote_count } = fullEpisode || {};

	const creditsQuery = useTVShowEpisodeCreditsQuery({
		props: { id: Number(id), season: Number(season), episode: Number(episode) },
		options: { enabled: !!id && !!season && !!episode }
	});

	const { cast = [], guest_stars: guests = [], crew = [] } = creditsQuery.data || {};

	const imagesQuery = useTVShowEpisodeImagesQuery({
		props: { id: Number(id), season: Number(season), episode: Number(episode) },
		options: { enabled: !!id && !!season && !!episode }
	});

	const { stills = [] } = imagesQuery.data || {};

	const videosQuery = useTVShowEpisodeVideosQuery({
		props: { id: Number(id), season: Number(season), episode: Number(episode) },
		options: { enabled: !!id && !!season && !!episode }
	});

	const { results: videos = [] } = videosQuery.data || {};

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		const tab = episodeTabs.find((_tab, i) => index === i);

		if (tab && tab.path) {
			navigate({ ...location, ...tab.path });
		}
	};

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = episodeTabs.findIndex(({ path }) => path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<EpisodeContext.Provider
			value={{
				showQuery,
				episodeQuery,
				creditsQuery,
				imagesQuery,
				videosQuery,
				onSetActiveTab: handleTabChange
			}}
		>
			<Page>
				<PageHeader
					renderLeftPanel={
						!isSm && (isEpisodeFetching || isEpisodeLoading)
							? () => <ViewDummyPoster />
							: !isSm
							? () => <EpisodePoster episode={fullEpisode} />
							: undefined
					}
					renderTitle={(props) => (
						<Skeleton
							colorMode={colorMode}
							isLoaded={!!name && !(isEpisodeFetching || isEpisodeLoading)}
							variant='text'
						>
							<Text {...props}>{name}</Text>
						</Skeleton>
					)}
					renderSubtitle={
						isEpisodeFetching || isEpisodeLoading
							? () => <EpisodesDummyInfo />
							: fullEpisode
							? () => <EpisodeInfo episode={fullEpisode} />
							: undefined
					}
					actions={
						isEpisodeFetching || isEpisodeLoading ? (
							<ViewDummyRating />
						) : vote_average ? (
							<ViewRating rating={vote_average} count={vote_count} />
						) : undefined
					}
					direction='row'
					spacing={spacing}
					p={spacing}
				/>
				{isSm && (isEpisodeFetching || isEpisodeLoading) ? (
					<ViewDummyPoster isFullWidth p={spacing} />
				) : isSm ? (
					<EpisodePoster episode={fullEpisode} isFullWidth p={spacing} />
				) : null}
				{!isGuest && (isEpisodeFetching || isEpisodeLoading) ? (
					<EpisodesDummyActions p={spacing} />
				) : !isGuest && fullEpisode ? (
					<EpisodeActions episode={fullEpisode} p={spacing} />
				) : null}
				<PageBody px={spacing} pb={spacing}>
					<Tabs
						width='100%'
						height='100%'
						color={color}
						colorMode={colorMode}
						activeTab={activeTabDebounced}
						onChange={handleTabChange}
						size='xl'
					>
						<VStack width='100%' height='100%' spacing={spacing}>
							<TabList
								// TODO: Go over all View pages and add error handling ... meaning show errors if query fails
								tabs={episodeTabs.map((tab, index) => {
									return {
										label: tab.label,
										// isDisabled:
										renderLeft: tab.getIconProps
											? (props) => {
													return tab.getIconProps ? (
														<TabIcon
															{...tab.getIconProps({
																...props,
																isActive: activeTabDebounced === index
															})}
														/>
													) : undefined;
											  }
											: undefined,
										renderRight: tab.getTotalBadgeProps
											? (props) => {
													return tab.getTotalBadgeProps ? (
														<TotalBadge
															{...tab.getTotalBadgeProps({
																...props,
																total:
																	index === castTabIndex
																		? cast.length
																		: index === guestStarsTabIndex
																		? guests.length
																		: index === crewTabIndex
																		? crew.length
																		: index === photosTabIndex
																		? stills.length
																		: index === videosTabIndex
																		? videos.length
																		: 0,
																isActive: activeTabDebounced === index
															})}
														/>
													) : undefined;
											  }
											: undefined
									};
								})}
							/>

							<TabPanels>
								<Suspense fallback={<DummyOverviewTab />}>
									<OverviewTab />
								</Suspense>

								<Suspense fallback={<DummyCastTab />}>
									<CastTab />
								</Suspense>

								<Suspense fallback={<DummyGuestStarsTab />}>
									<GuestStarsTab />
								</Suspense>

								<Suspense fallback={<DummyCrewTab />}>
									<CrewTab />
								</Suspense>

								<Suspense fallback={<DummyPhotosTab />}>
									<PhotosTab />
								</Suspense>

								<Suspense fallback={<DummyVideosTab />}>
									<VideosTab />
								</Suspense>
							</TabPanels>
						</VStack>
					</Tabs>
				</PageBody>
			</Page>
		</EpisodeContext.Provider>
	);
};

export default Episode;
