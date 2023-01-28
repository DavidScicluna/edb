import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { DummyParagraph } from '../../../../../../components';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

import DummyOverviewTabCast from './components/DummyOverviewTabCast';
import DummyOverviewTabGuestStars from './components/DummyOverviewTabGuestStars';
import DummyOverviewTabPhotos from './components/DummyOverviewTabPhotos';
import DummyOverviewTabVideos from './components/DummyOverviewTabVideos';
import DummyOverviewTabTVShow from './components/DummyOverviewTabTVShow';
import DummyOverviewTabPrevNextEpisodes from './components/DummyOverviewTabPrevNextEpisodes';

const DummyOverviewTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<DummyParagraph />

			<DummyOverviewTabCast />

			<DummyOverviewTabGuestStars />

			<DummyOverviewTabPhotos />

			<DummyOverviewTabVideos />

			<DummyOverviewTabTVShow />

			<DummyOverviewTabPrevNextEpisodes />
		</VStack>
	);
};

export default DummyOverviewTab;
