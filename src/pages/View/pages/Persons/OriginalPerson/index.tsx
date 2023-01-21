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
import { keys, pick } from 'lodash';

import {
	useExternalIDsQuery,
	useMediaTypeImagesQuery,
	useMediaTypeQuery,
	usePersonCreditsQuery
} from '../../../../../common/queries';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import Page from '../../../../../containers/Page';
import PageBody from '../../../../../containers/Page/components/PageBody';
import PageHeader from '../../../../../containers/Page/components/PageHeader';
import { useUserTheme } from '../../../../../common/hooks';
import { Suspense, TotalBadge } from '../../../../../components';
import ViewDummyPoster from '../../../components/ViewDummyPoster';
import ViewSocials from '../../../components/ViewSocials';
import ViewDummySocials from '../../../components/ViewDummySocials';
import { CastMovieCredit, CastTVCredit, CrewMovieCredit, CrewTVCredit } from '../../../../../common/types/person';
import { method as defaultOnSetActiveTab } from '../../../../../common/data/defaultPropValues';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import DummyCreditsTab from '../components/DummyCreditsTab';
import PersonsDummyInfo from '../components/PersonsDummyInfo';
import { ViewParams as PersonParams } from '../../../common/types';
import personTabs, { creditsTabIndex, photosTabIndex } from '../common/data/tabs';

import PersonActions from './components/PersonActions';
import PersonInfo from './components/PersonInfo';
import PersonPoster from './components/PersonPoster';
import { PersonContext as PersonContextType, PersonMovieDepartments, PersonTVShowDepartments } from './types';
import { getDepartments } from './common/utils';

const OverviewTab = lazy(() => import('./components/OverviewTab'));
const CreditsTab = lazy(() => import('./components/CreditsTab'));
const PhotosTab = lazy(() => import('./components/PhotosTab'));

export const PersonContext = createContext<PersonContextType>({ onSetActiveTab: defaultOnSetActiveTab });

const Person: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const { id } = useParams<PersonParams>();
	const location = useLocation();
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const [movieDepartments, setMovieDepartments] = useState<PersonMovieDepartments>([]);
	const movieDepartmentsDebounced = useDebounce<PersonMovieDepartments>(movieDepartments);
	const [tvShowDepartments, setTVShowDepartments] = useState<PersonTVShowDepartments>([]);
	const tvShowDepartmentsDebounced = useDebounce<PersonTVShowDepartments>(tvShowDepartments);

	const personQuery = useMediaTypeQuery<'person'>({ props: { mediaType: 'person', id: Number(id) } });

	const { data: person, isFetching: isPersonFetching, isLoading: isPersonLoading } = personQuery;

	const movieCreditsQuery = usePersonCreditsQuery<'movie'>({
		props: { mediaType: 'movie', id: Number(id) },
		options: {
			enabled: !!person?.id,
			onSuccess: (credits) => {
				setMovieDepartments([...getDepartments<CastMovieCredit, CrewMovieCredit>({ credits })]);
			}
		}
	});

	const { data: movieCredits } = movieCreditsQuery;
	const { cast: movieCastCredits = [], crew: movieCrewCredits = [] } = movieCredits || {};

	const tvShowCreditsQuery = usePersonCreditsQuery<'tv'>({
		props: { mediaType: 'tv', id: Number(id) },
		options: {
			enabled: !!person?.id,
			onSuccess: (credits) => {
				setTVShowDepartments([...getDepartments<CastTVCredit, CrewTVCredit>({ credits })]);
			}
		}
	});

	const { data: tvShowCredits } = tvShowCreditsQuery;
	const { cast: tvShowCastCredits = [], crew: tvShowCrewCredits = [] } = tvShowCredits || {};

	const {
		data: externalIDs,
		isFetching: isExternalIDsFetching,
		isLoading: isExternalIDsLoading
	} = useExternalIDsQuery({
		props: { mediaType: 'person', id: Number(id) },
		options: { enabled: !!person?.id }
	});

	const imagesQuery = useMediaTypeImagesQuery({
		props: { mediaType: 'person', id: Number(id) },
		options: { enabled: !!person?.id }
	});

	const { profiles = [] } = imagesQuery.data || {};

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		const tab = personTabs.find((_tab, i) => index === i);

		if (tab && tab.path) {
			navigate({ ...location, ...tab.path });
		}
	};

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = personTabs.findIndex(({ path }) => path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<PersonContext.Provider
			value={{
				personQuery,
				movieCreditsQuery,
				tvShowCreditsQuery,
				imagesQuery,
				onSetActiveTab: handleTabChange
			}}
		>
			<Page>
				<PageHeader
					renderLeftPanel={
						!isSm && (isPersonFetching || isPersonLoading)
							? () => <ViewDummyPoster />
							: !isSm
							? () => <PersonPoster person={person} />
							: undefined
					}
					renderTitle={(props) => (
						<Skeleton
							colorMode={colorMode}
							isLoaded={!!person?.name && !(isPersonFetching || isPersonLoading)}
							variant='text'
						>
							<Text {...props}>{person?.name}</Text>
						</Skeleton>
					)}
					renderSubtitle={
						isPersonFetching || isPersonLoading
							? () => <PersonsDummyInfo />
							: person
							? () => (
									<PersonInfo
										person={person}
										movieDepartments={movieDepartmentsDebounced}
										tvShowDepartments={tvShowDepartmentsDebounced}
									/>
							  )
							: undefined
					}
					direction='row'
					spacing={spacing}
					p={spacing}
				/>
				{isSm && (isPersonFetching || isPersonLoading) ? (
					<ViewDummyPoster isFullWidth p={spacing} />
				) : isSm ? (
					<PersonPoster person={person} isFullWidth p={spacing} />
				) : null}
				{person ? <PersonActions person={person} p={spacing} /> : null}
				<PageBody px={spacing} pb={spacing}>
					<Tabs
						width='100%'
						color={color}
						colorMode={colorMode}
						activeTab={activeTabDebounced}
						onChange={handleTabChange}
						size='xl'
					>
						<VStack width='100%' spacing={spacing}>
							<TabList
								tabs={personTabs.map((tab, index) => {
									return {
										label: tab.label,
										renderRight: tab.getTotalBadgeProps
											? (props) => {
													return tab.getTotalBadgeProps ? (
														<TotalBadge
															{...tab.getTotalBadgeProps({
																...props,
																total:
																	index === creditsTabIndex
																		? movieCastCredits.length +
																		  movieCrewCredits.length +
																		  tvShowCastCredits.length +
																		  tvShowCrewCredits.length
																		: index === photosTabIndex
																		? profiles.length
																		: 0,
																isActive: activeTabDebounced === index
															})}
														/>
													) : undefined;
											  }
											: undefined
									};
								})}
								renderRight={
									!isSm && (isExternalIDsFetching || isExternalIDsLoading)
										? () => <ViewDummySocials />
										: !isSm &&
										  keys(
												pick(externalIDs, [
													'facebook_id',
													'twitter_id',
													'instagram_id',
													'imdb_id'
												])
										  ).length > 0
										? () => (
												<ViewSocials
													socials={{ ...externalIDs, homepage_id: person?.homepage }}
												/>
										  )
										: undefined
								}
							/>

							<TabPanels>
								<Suspense fallback={<DummyOverviewTab />}>
									<OverviewTab />
								</Suspense>

								<Suspense fallback={<DummyCreditsTab />}>
									<CreditsTab
										movieDepartments={movieDepartmentsDebounced}
										tvShowDepartments={tvShowDepartmentsDebounced}
										total={
											movieCastCredits.length +
											movieCrewCredits.length +
											tvShowCastCredits.length +
											tvShowCrewCredits.length
										}
									/>
								</Suspense>

								<Suspense fallback={<DummyPhotosTab />}>
									<PhotosTab />
								</Suspense>
							</TabPanels>
						</VStack>
					</Tabs>
				</PageBody>
			</Page>
		</PersonContext.Provider>
	);
};

export default Person;
