import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

import DummyOverviewTabHero from './components/DummyOverviewTabHero';
import DummyOverviewTabLastEpisode from './components/DummyOverviewTabLastEpisode';
import DummyOverviewTabRecommendations from './components/DummyOverviewTabRecommendations';
import DummyOverviewTabSimilar from './components/DummyOverviewTabSimilar';
import DummyOverviewTabPhotos from './components/DummyOverviewTabPhotos';
import DummyOverviewTabVideos from './components/DummyOverviewTabVideos';
import DummyOverviewTabTopCast from './components/DummyOverviewTabTopCast';
import DummyOverviewTabReview from './components/DummyOverviewTabReview';

const DummyOverviewTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<DummyOverviewTabHero />

			<DummyOverviewTabTopCast />

			<DummyOverviewTabLastEpisode />

			<DummyOverviewTabPhotos />

			<DummyOverviewTabVideos />

			<DummyOverviewTabReview />

			<DummyOverviewTabSimilar />

			<DummyOverviewTabRecommendations />
		</VStack>
	);
};

export default DummyOverviewTab;
