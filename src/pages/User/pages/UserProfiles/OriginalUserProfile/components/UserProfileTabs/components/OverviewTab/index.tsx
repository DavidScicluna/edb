import { FC, lazy } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
import { useSelector } from '../../../../../../../../../common/hooks';
import { Paragraph, Suspense } from '../../../../../../../../../components';
import DummyMovies from '../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs/components/DummyAllTab/components/DummyAllTabMovies';
import DummyPeople from '../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs/components/DummyAllTab/components/DummyAllTabPeople';
import DummyTVShows from '../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs/components/DummyAllTab/components/DummyAllTabTVShows';
import DummyWatchlist from '../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyOverviewTab/components/DummyOverviewTabWatchlist';

import { OverviewTabProps } from './types';

const Watchlist = lazy(() => import('./components/OverviewTabWatchlist'));
const LikedMovies = lazy(() => import('./components/OverviewTabLikedMovies'));
const LikedTVShows = lazy(() => import('./components/OverviewTabLikedTVShows'));
const LikedPeople = lazy(() => import('./components/OverviewTabLikedPeople'));

const OverviewTab: FC<OverviewTabProps> = ({ onTabChange }) => {
	const { spacing } = useLayoutContext();

	const bio = useSelector((state) => state.users.data.activeUser.data.info.bio);

	return (
		<VStack width='100%' spacing={spacing}>
			{bio && <Paragraph title='Biography'>{bio}</Paragraph>}

			<Suspense fallback={<DummyWatchlist />}>
				<Watchlist onTabChange={onTabChange} />
			</Suspense>

			<Suspense fallback={<DummyMovies />}>
				<LikedMovies onTabChange={onTabChange} />
			</Suspense>

			<Suspense fallback={<DummyTVShows />}>
				<LikedTVShows onTabChange={onTabChange} />
			</Suspense>

			<Suspense fallback={<DummyPeople />}>
				<LikedPeople onTabChange={onTabChange} />
			</Suspense>

			{/* TODO: Add RecentlyViewed HorizontalGrid */}
		</VStack>
	);
};

export default OverviewTab;
