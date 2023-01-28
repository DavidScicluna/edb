import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';

import OverviewTabHero from './components/OverviewTabHero';
import OverviewTabLastEpisode from './components/OverviewTabLastEpisode';
import OverviewTabCreators from './components/OverviewTabCreators';
import OverviewTabTopActor from './components/OverviewTabTopActor';
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
				<OverviewTabHero key='ds-edb-tv-show-overview-tab-hero' />,

				<OverviewTabTopCast key='ds-edb-tv-show-overview-tab-top-cast' />,

				<OverviewTabLastEpisode key='ds-edb-tv-show-overview-tab-last-episode' />,

				<OverviewTabPhotos key='ds-edb-tv-show-overview-tab-photos' />,

				<OverviewTabVideos key='ds-edb-tv-show-overview-tab-videos' />,

				<OverviewTabReview key='ds-edb-tv-show-overview-tab-review' />,

				<OverviewTabCreators key='ds-edb-tv-show-overview-tab-creators' />,

				<OverviewTabTopActor key='ds-edb-tv-show-overview-tab-top-actor' />,

				<OverviewTabSimilar key='ds-edb-tv-show-overview-tab-similar' />,

				<OverviewTabRecommendations key='ds-edb-tv-show-overview-tab-recommendations' />
			])}
		</VStack>
	);
};

export default OverviewTab;
