import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

import DummyOverviewTabCollection from './components/DummyOverviewTabCollection';
import DummyOverviewTabHero from './components/DummyOverviewTabHero';
import DummyOverviewTabPhotos from './components/DummyOverviewTabPhotos';
import DummyOverviewTabVideos from './components/DummyOverviewTabVideos';
import DummyOverviewTabTopCast from './components/DummyOverviewTabTopCast';
import DummyOverviewTabReview from './components/DummyOverviewTabReview';
import DummyOverviewTabRecommendations from './components/DummyOverviewTabRecommendations';
import DummyOverviewTabSimilar from './components/DummyOverviewTabSimilar';

const DummyOverviewTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<DummyOverviewTabHero />

			<DummyOverviewTabTopCast />

			<DummyOverviewTabPhotos />

			<DummyOverviewTabVideos />

			<DummyOverviewTabReview />

			<DummyOverviewTabCollection />

			<DummyOverviewTabSimilar />

			<DummyOverviewTabRecommendations />
		</VStack>
	);
};

export default DummyOverviewTab;
