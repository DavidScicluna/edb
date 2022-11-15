import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';

import DummyAllTabMovies from './components/DummyAllTabMovies';
import DummyAllTabPeople from './components/DummyAllTabPeople';
import DummyAllTabTVShows from './components/DummyAllTabTVShows';
import DummyAllTabCollections from './components/DummyAllTabCollections';
import DummyAllTabCompanies from './components/DummyAllTabCompanies';

const DummyAllTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<DummyAllTabMovies />

			<DummyAllTabTVShows />

			<DummyAllTabPeople />

			<DummyAllTabCompanies />

			<DummyAllTabCollections />
		</VStack>
	);
};

export default DummyAllTab;
