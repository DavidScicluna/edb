import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
import { DummyParagraph } from '../../../../../../../../../components';
import DummyMovies from '../../UserProfileTabsDummyTabs/components/DummyAllTab/components/DummyAllTabMovies';
import DummyPeople from '../../UserProfileTabsDummyTabs/components/DummyAllTab/components/DummyAllTabPeople';
import DummyTVShows from '../../UserProfileTabsDummyTabs/components/DummyAllTab/components/DummyAllTabTVShows';

import DummyWatchlist from './components/DummyOverviewTabWatchlist';

const OverviewTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<DummyParagraph />

			<DummyWatchlist />

			<DummyMovies />

			<DummyTVShows />

			<DummyPeople />

			{/* TODO: Add RecentlyViewed HorizontalGrid */}
		</VStack>
	);
};

export default OverviewTab;
