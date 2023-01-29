import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';

import AllTabCollections from './components/AllTabCollections';
import AllTabCompanies from './components/AllTabCompanies';
import AllTabMovies from './components/AllTabMovies';
import AllTabPeople from './components/AllTabPeople';
import AllTabShows from './components/AllTabShows';
import { AllTabProps } from './types';

const AllTab: FC<AllTabProps> = (props) => {
	const { spacing } = useLayoutContext();

	const { mediaTypes, movies, shows, people, collections, companies } = props;

	return (
		<VStack width='100%' spacing={spacing}>
			{/* Movies */}
			{(movies?.total_results || 0) > 0 && <AllTabMovies mediaTypes={mediaTypes} movies={movies} />}

			{/* TV Shows */}
			{(shows?.total_results || 0) > 0 && <AllTabShows mediaTypes={mediaTypes} shows={shows} />}

			{/* People */}
			{(people?.total_results || 0) > 0 && <AllTabPeople mediaTypes={mediaTypes} people={people} />}

			{/* Collections */}
			{(collections?.total_results || 0) > 0 && (
				<AllTabCollections mediaTypes={mediaTypes} collections={collections} />
			)}

			{/* Companies */}
			{(companies?.total_results || 0) > 0 && <AllTabCompanies mediaTypes={mediaTypes} companies={companies} />}
		</VStack>
	);
};

export default AllTab;
