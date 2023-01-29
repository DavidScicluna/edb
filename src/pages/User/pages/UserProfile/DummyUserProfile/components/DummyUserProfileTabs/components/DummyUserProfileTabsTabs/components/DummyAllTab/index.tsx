import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../../../../../containers/Layout/common/hooks';

import AllTabDummyMovies from './components/DummyAllTabMovies';
import AllTabDummyTVShows from './components/DummyAllTabTVShows';
import AllTabDummyPeople from './components/DummyAllTabPeople';
import { DummyAllTabProps } from './types';

const DummyAllTab: FC<DummyAllTabProps> = ({ mediaTypes }) => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			{mediaTypes.some((mediaType) => mediaType === 'movie') && <AllTabDummyMovies />}

			{mediaTypes.some((mediaType) => mediaType === 'tv') && <AllTabDummyTVShows />}

			{mediaTypes.some((mediaType) => mediaType === 'person') && <AllTabDummyPeople />}
		</VStack>
	);
};

export default DummyAllTab;
