import { FC, createContext, useState, lazy } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router';

import { TabsOnChangeProps, useDebounce, Tabs, TabList, TabPanels, Skeleton } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { keys, pick } from 'lodash';

import {
	usePersonExternalIDsQuery,
	usePersonImagesQuery,
	usePersonMovieCreditsQuery,
	usePersonQuery,
	usePersonTVShowCreditsQuery
} from '../../../../../common/queries';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import Page from '../../../../../containers/Page';
import PageBody from '../../../../../containers/Page/components/PageBody';
import PageHeader from '../../../../../containers/Page/components/PageHeader';
import { useUserTheme } from '../../../../../common/hooks';
import { Suspense, TotalBadge } from '../../../../../components';
import PersonDummyAvatar from '../../../components/ViewDummyAvatar';
import ViewSocials from '../../../components/ViewSocials';
import ViewDummySocials from '../../../components/ViewDummySocials';
import { CastMovieCredit, CastTVCredit, CrewMovieCredit, CrewTVCredit } from '../../../../../common/types/person';
import { method as defaultOnSetActiveTab } from '../../../../../common/data/defaultPropValues';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import DummyCreditsTab from '../components/DummyCreditsTab';

import PersonAvatar from './components/PersonAvatar';
import {
	PersonContext as PersonContextType,
	PersonTabs,
	PersonParams,
	PersonMovieDepartments,
	PersonTVShowDepartments
} from './types';
import { getDepartments } from './common/utils';
import PersonInfo from './components/PersonInfo';

const OverviewTab = lazy(() => import('./components/OverviewTab'));
const CreditsTab = lazy(() => import('./components/CreditsTab'));
const PhotosTab = lazy(() => import('./components/PhotosTab'));

export const PersonContext = createContext<PersonContextType>({ onSetActiveTab: defaultOnSetActiveTab });

export const tabs: PersonTabs = [
	{
		path: { hash: 'overview' },
		label: 'Overview'
	},
	{
		path: { hash: 'credits' },
		label: 'Credits',
		renderBadge: ({ color, isActive, ...rest }) => (
			<TotalBadge {...rest} color={isActive ? color : 'gray'} variant={isActive ? 'contained' : 'outlined'} />
		)
	},
	{
		path: { hash: 'photos' },
		label: 'Photos',
		renderBadge: ({ color, isActive, ...rest }) => (
			<TotalBadge {...rest} color={isActive ? color : 'gray'} variant={isActive ? 'contained' : 'outlined'} />
		)
	}
];

const Person: FC = () => {
	const { color, colorMode } = useUserTheme();

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

	const personQuery = usePersonQuery({ props: { id: Number(id) } });

	const { data: person, isFetching: isPersonFetching, isLoading: isPersonLoading } = personQuery;

	const movieCreditsQuery = usePersonMovieCreditsQuery({
		props: { id: Number(id) },
		options: {
			onSuccess: (credits) => {
				setMovieDepartments([...getDepartments<CastMovieCredit, CrewMovieCredit>({ credits })]);
			}
		}
	});

	const { data: movieCredits } = movieCreditsQuery;
	const { cast: movieCastCredits = [], crew: movieCrewCredits = [] } = movieCredits || {};

	const tvShowCreditsQuery = usePersonTVShowCreditsQuery({
		props: { id: Number(id) },
		options: {
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
	} = usePersonExternalIDsQuery({ props: { id: Number(id) } });

	const imagesQuery = usePersonImagesQuery({ props: { id: Number(id) } });

	const { data: images } = imagesQuery;

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		const tab = tabs.find((_tab, i) => index === i);

		if (tab && tab.path) {
			navigate({ ...location, ...tab.path });
		}
	};

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = tabs.findIndex((tab) => tab.path.hash === hash);

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
				onSetActiveTab: ({ index }) => setActiveTab(index)
			}}
		>
			<Page>
				<PageHeader
					renderLeftPanel={
						isPersonFetching || isPersonLoading
							? () => <PersonDummyAvatar />
							: person
							? () => <PersonAvatar person={person} />
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
						person
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
								tabs={tabs.map((tab, index) => {
									return {
										label: tab.label,
										renderRight: (props) => {
											return tab.renderBadge
												? tab.renderBadge({
														...props,
														total:
															index === 1
																? movieCastCredits.length +
																  movieCrewCredits.length +
																  tvShowCastCredits.length +
																  tvShowCrewCredits.length
																: index === 2
																? images?.profiles?.length || 0
																: 0,
														isActive: activeTabDebounced === index
												  })
												: undefined;
										}
									};
								})}
								renderRight={
									keys(
										pick(externalIDs, [
											'facebook_id',
											'twitter_id',
											'instagram_id',
											'imdb_id',
											'homepage_id'
										])
									).length > 0
										? () => <ViewSocials socials={{ ...externalIDs }} />
										: isExternalIDsFetching || isExternalIDsLoading
										? () => <ViewDummySocials />
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
