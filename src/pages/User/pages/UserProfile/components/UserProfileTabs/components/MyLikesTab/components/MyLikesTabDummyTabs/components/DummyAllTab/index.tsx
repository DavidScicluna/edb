import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../../../../../../containers/Layout/common/hooks';

import AllTabDummyMovies from './components/DummyAllTabMovies';
import AllTabDummyTVShows from './components/DummyAllTabTVShows';
import AllTabDummyPeople from './components/DummyAllTabPeople';

const DummyAllTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<AllTabDummyMovies />

			<AllTabDummyTVShows />

			<AllTabDummyPeople />
		</VStack>
	);
};

export default DummyAllTab;
