import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { DummyParagraph, Paragraph } from '../../../../../../../components';
import { useEpisodeContext } from '../../common/hooks';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';

import OverviewTabCast from './components/OverviewTabCast';
import OverviewTabGuestStars from './components/OverviewTabGuestStars';
import OverviewTabPhotos from './components/OverviewTabPhotos';
import OverviewTabVideos from './components/OverviewTabVideos';
import OverviewTabTVShow from './components/OverviewTabTVShow';
import OverviewTabPrevNextEpisodes from './components/OverviewTabPrevNextEpisodes';

const OverviewTab: FC = () => {
	const { spacing } = useLayoutContext();

	const { episodeQuery } = useEpisodeContext();

	const { data: episode, isFetching: isFetchingEpisode, isLoading: isEpisodeLoading } = episodeQuery || {};
	const { overview } = episode || {};

	return (
		<VStack width='100%' spacing={spacing}>
			{compact([
				isFetchingEpisode || isEpisodeLoading ? (
					<DummyParagraph key='ds-edb-episode-overview-tab-dummy-paragraph' />
				) : overview ? (
					<Paragraph key='ds-edb-episode-overview-tab-paragraph' title='Synopsis' keepFooter>
						{overview}
					</Paragraph>
				) : null,

				<OverviewTabCast key='ds-edb-episode-overview-tab-cast' />,

				<OverviewTabGuestStars key='ds-edb-episode-overview-tab-guest-stars' />,

				<OverviewTabPhotos key='ds-edb-episode-overview-tab-photos' />,

				<OverviewTabVideos key='ds-edb-episode-overview-tab-videos' />,

				<OverviewTabTVShow key='ds-edb-episode-overview-tab-tv-show' />,

				<OverviewTabPrevNextEpisodes key='ds-edb-episode-overview-tab-prev-next-episodes' />
			])}
		</VStack>
	);
};

export default OverviewTab;
