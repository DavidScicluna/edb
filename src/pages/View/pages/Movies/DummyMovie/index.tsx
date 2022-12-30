import { FC, useState } from 'react';

import { useLocation } from 'react-router';

import { useTheme, useDebounce, Tabs, DummyTabList, TabPanels, Skeleton } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import ViewDummyPoster from '../../../components/ViewDummyPoster';
import { useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import Page from '../../../../../containers/Page';
import PageHeader from '../../../../../containers/Page/components/PageHeader';
import PageBody from '../../../../../containers/Page/components/PageBody';
import ViewDummySocials from '../../../components/ViewDummySocials';
import ViewDummyRating from '../../../components/ViewDummyRating';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyReviewsTab from '../components/DummyReviewsTab';
import DummyCastTab from '../components/DummyCastTab';
import DummyCrewTab from '../components/DummyCrewTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import DummyVideosTab from '../components/DummyVideosTab';
import DummyMovieActions from '../components/DummyMovieActions';
import DummyMovieInfo from '../components/DummyMovieInfo';

import { DummyMovieTabs } from './types';

export const movieTabs: DummyMovieTabs = [
	{ path: { hash: 'overview' }, label: 'Overview' },
	{ path: { hash: 'cast' }, label: 'Cast' },
	{ path: { hash: 'crew' }, label: 'Crew' },
	{ path: { hash: 'reviews' }, label: 'Reviews' },
	{ path: { hash: 'photos' }, label: 'Photos' },
	{ path: { hash: 'videos' }, label: 'Videos' }
];

const Movie: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isGuest, spacing } = useLayoutContext();

	const location = useLocation();

	// TODO: Go over all useDebounce and check that we are actually using the debounced value not the state!
	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = movieTabs.findIndex((tab) => tab.path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<Page>
			<PageHeader
				renderLeftPanel={activeTabDebounced !== 0 ? () => <ViewDummyPoster /> : undefined}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Movie Title</Text>
					</Skeleton>
				)}
				renderSubtitle={() => <DummyMovieInfo />}
				actions={<ViewDummyRating />}
				direction='row'
				spacing={spacing}
				p={spacing}
			/>
			{!isGuest && <DummyMovieActions p={spacing} />}
			<PageBody px={spacing} pb={spacing}>
				<Tabs
					width='100%'
					height='100%'
					color={color}
					colorMode={colorMode}
					activeTab={activeTabDebounced}
					size='xl'
				>
					<VStack width='100%' height='100%' spacing={spacing}>
						<DummyTabList
							tabs={movieTabs.map(({ label }) => {
								return { label };
							})}
							renderRight={!isSm ? () => <ViewDummySocials /> : undefined}
						/>

						<TabPanels>
							<DummyOverviewTab />

							<DummyCastTab />

							<DummyCrewTab />

							<DummyReviewsTab />

							<DummyPhotosTab />

							<DummyVideosTab />
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default Movie;
