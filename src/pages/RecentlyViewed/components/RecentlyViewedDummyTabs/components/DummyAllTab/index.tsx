import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

import DummyAllTabMovies from './components/DummyAllTabMovies';
import DummyAllTabTVShows from './components/DummyAllTabTVShows';
import DummyAllTabPeople from './components/DummyAllTabPeople';
import DummyAllTabCollections from './components/DummyAllTabCollections';

const DummyAllTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<DummyAllTabMovies />

			<DummyAllTabTVShows />

			<DummyAllTabPeople />

			<DummyAllTabCollections />
		</VStack>
	);
};

export default DummyAllTab;
