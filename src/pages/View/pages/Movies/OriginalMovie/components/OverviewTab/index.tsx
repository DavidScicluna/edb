import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';

import OverviewTabHero from './components/OverviewTabHero';
import OverviewTabDirector from './components/OverviewTabDirector';
import OverviewTabTopActor from './components/OverviewTabTopActor';
import OverviewTabWriter from './components/OverviewTabWriter';
import OverviewTabRecommendations from './components/OverviewTabRecommendations';
import OverviewTabSimilar from './components/OverviewTabSimilar';
import OverviewTabPhotos from './components/OverviewTabPhotos';
import OverviewTabVideos from './components/OverviewTabVideos';
import OverviewTabTopCast from './components/OverviewTabTopCast';
import OverviewTabReview from './components/OverviewTabReview';

const OverviewTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			{compact([
				<OverviewTabHero key='ds-edb-movie-overview-tab-hero' />,

				<OverviewTabTopCast key='ds-edb-movie-overview-tab-top-cast' />,

				<OverviewTabPhotos key='ds-edb-movie-overview-tab-photos' />,

				<OverviewTabVideos key='ds-edb-movie-overview-tab-videos' />,

				<OverviewTabReview key='ds-edb-movie-overview-tab-review' />,

				<OverviewTabDirector key='ds-edb-movie-overview-tab-director' />,

				<OverviewTabWriter key='ds-edb-movie-overview-tab-writer' />,

				<OverviewTabTopActor key='ds-edb-movie-overview-tab-top-actor' />,

				<OverviewTabSimilar key='ds-edb-movie-overview-tab-similar' />,

				<OverviewTabRecommendations key='ds-edb-movie-overview-tab-recommendations' />
			])}
		</VStack>
	);
};

export default OverviewTab;
