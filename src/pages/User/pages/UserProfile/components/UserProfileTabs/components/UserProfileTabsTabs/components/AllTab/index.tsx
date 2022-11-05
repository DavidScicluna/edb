import { FC, lazy } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../../../../containers/Layout/common/hooks';
import { Suspense } from '../../../../../../../../../../components';
import AllTabDummyMovies from '../../../UserProfileTabsDummyTabs/components/DummyAllTab/components/DummyAllTabMovies';
import AllTabDummyPeople from '../../../UserProfileTabsDummyTabs/components/DummyAllTab/components/DummyAllTabPeople';
import AllTabDummyTVShows from '../../../UserProfileTabsDummyTabs/components/DummyAllTab/components/DummyAllTabTVShows';

import { AllTabProps } from './types';

const AllTabMovies = lazy(() => import('./components/AllTabMovies'));
const AllTabPeople = lazy(() => import('./components/AllTabPeople'));
const AllTabTVShows = lazy(() => import('./components/AllTabTVShows'));

const AllTab: FC<AllTabProps> = ({ type, mediaItems, onSetActiveTab }) => {
	const { movie = [], tv = [], person = [], company = [], collection = [] } = mediaItems;

	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			{movie.length > 0 && (
				<Suspense fallback={<AllTabDummyMovies />}>
					<AllTabMovies type={type} movies={movie} onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}

			{tv.length > 0 && (
				<Suspense fallback={<AllTabDummyTVShows />}>
					<AllTabTVShows type={type} shows={tv} onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}

			{person.length > 0 && (
				<Suspense fallback={<AllTabDummyPeople />}>
					<AllTabPeople type={type} people={person} onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}
		</VStack>
	);
};

export default AllTab;
