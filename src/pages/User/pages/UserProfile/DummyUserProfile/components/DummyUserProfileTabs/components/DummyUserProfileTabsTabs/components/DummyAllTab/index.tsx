import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../../../../../containers/Layout/common/hooks';

import DummyAllTabMovies from './components/DummyAllTabMovies';
import DummyAllTabTVShows from './components/DummyAllTabTVShows';
import DummyAllTabPeople from './components/DummyAllTabPeople';
import DummyAllTabCollections from './components/DummyAllTabCollections';
import DummyAllTabCompanies from './components/DummyAllTabCompanies';
import { DummyAllTabProps } from './types';

const DummyAllTab: FC<DummyAllTabProps> = ({ mediaTypes }) => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			{mediaTypes.some((mediaType) => mediaType === 'movie') && <DummyAllTabMovies />}

			{mediaTypes.some((mediaType) => mediaType === 'tv') && <DummyAllTabTVShows />}

			{mediaTypes.some((mediaType) => mediaType === 'person') && <DummyAllTabPeople />}

			{mediaTypes.some((mediaType) => mediaType === 'collection') && <DummyAllTabCollections />}

			{mediaTypes.some((mediaType) => mediaType === 'company') && <DummyAllTabCompanies />}
		</VStack>
	);
};

export default DummyAllTab;
