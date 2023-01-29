import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../../../../../containers/Layout/common/hooks';
import { Suspense } from '../../../../../../../../../../../components';
import DummyAllTabMovies from '../../../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs/components/DummyAllTab/components/DummyAllTabMovies';
import DummyAllTabPeople from '../../../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs/components/DummyAllTab/components/DummyAllTabPeople';
import DummyAllTabTVShows from '../../../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs/components/DummyAllTab/components/DummyAllTabTVShows';
import DummyAllTabCollections from '../../../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs/components/DummyAllTab/components/DummyAllTabCollections';
import DummyAllTabCompanies from '../../../../../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyUserProfileTabsTabs/components/DummyAllTab/components/DummyAllTabCompanies';

import { AllTabProps } from './types';
import AllTabMovies from './components/AllTabMovies';
import AllTabPeople from './components/AllTabPeople';
import AllTabTVShows from './components/AllTabTVShows';
import AllTabCollections from './components/AllTabCollections';
import AllTabCompany from './components/AllTabCompany';

const AllTab: FC<AllTabProps> = ({ type, mediaItems, onSetActiveTab }) => {
	// TODO: Add Sections for Collectios & Companies
	const { movie = [], tv = [], person = [], collection = [], company = [] } = mediaItems;

	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			{movie.length > 0 && (
				<Suspense fallback={<DummyAllTabMovies />}>
					<AllTabMovies type={type} movies={movie} onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}

			{tv.length > 0 && (
				<Suspense fallback={<DummyAllTabTVShows />}>
					<AllTabTVShows type={type} shows={tv} onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}

			{person.length > 0 && (
				<Suspense fallback={<DummyAllTabPeople />}>
					<AllTabPeople type={type} people={person} onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}

			{collection.length > 0 && (
				<Suspense fallback={<DummyAllTabCollections />}>
					<AllTabCollections type={type} collections={collection} onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}

			{company.length > 0 && (
				<Suspense fallback={<DummyAllTabCompanies />}>
					<AllTabCompany type={type} companies={company} onSetActiveTab={onSetActiveTab} />
				</Suspense>
			)}
		</VStack>
	);
};

export default AllTab;
