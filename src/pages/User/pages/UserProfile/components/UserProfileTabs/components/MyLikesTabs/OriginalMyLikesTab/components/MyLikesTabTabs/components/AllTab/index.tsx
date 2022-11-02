import { FC, lazy } from 'react';

import { VStack } from '@chakra-ui/react';

import { useSelector } from '../../../../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../../../../containers/Layout/common/hooks';
import { Suspense } from '../../../../../../../../../../../../../components';
import AllTabDummyMovies from '../../../../../components/MyLikesTabDummyTabs/components/DummyAllTab/components/DummyAllTabMovies';
import AllTabDummyPeople from '../../../../../components/MyLikesTabDummyTabs/components/DummyAllTab/components/DummyAllTabPeople';
import AllTabDummyTVShows from '../../../../../components/MyLikesTabDummyTabs/components/DummyAllTab/components/DummyAllTabTVShows';

import { AllTabProps } from './types';

const AllTabMovies = lazy(() => import('./components/AllTabMovies'));
const AllTabPeople = lazy(() => import('./components/AllTabPeople'));
const AllTabShows = lazy(() => import('./components/AllTabTVShows'));

const AllTab: FC<AllTabProps> = ({ onSetActiveTab }) => {
	const { spacing } = useLayoutContext();

	const liked = useSelector((state) => state.users.data.activeUser.data.liked);

	return (
		<VStack width='100%' spacing={spacing}>
			{liked.movie.length > 0 && (
				<Suspense fallback={<AllTabDummyMovies />}>
					<AllTabMovies onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}

			{liked.tv.length > 0 && (
				<Suspense fallback={<AllTabDummyTVShows />}>
					<AllTabShows onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}

			{liked.person.length > 0 && (
				<Suspense fallback={<AllTabDummyPeople />}>
					<AllTabPeople onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}
		</VStack>
	);
};

export default AllTab;
