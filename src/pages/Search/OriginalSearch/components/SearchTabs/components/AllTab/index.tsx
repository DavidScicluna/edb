import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';

import AllTabMovies from './components/AllTabMovies';
import AllTabPeople from './components/AllTabPeople';
import AllTabShows from './components/AllTabShows';
import { AllTabProps } from './types';

const AllTab: FC<AllTabProps> = (props) => {
	const { spacing } = useLayoutContext();

	const { query, movies, shows, people, companies, collections, onSetActiveTab } = props;

	return (
		<VStack width='100%' spacing={spacing}>
			{/* Movies */}
			{(movies?.total_results || 0) > 0 && (
				<AllTabMovies query={query} movies={movies} onSetActiveTab={onSetActiveTab} />
			)}

			{/* TV Shows */}
			{(shows?.total_results || 0) > 0 && (
				<AllTabShows query={query} shows={shows} onSetActiveTab={onSetActiveTab} />
			)}

			{/* People */}
			{(people?.total_results || 0) > 0 && (
				<AllTabPeople query={query} people={people} onSetActiveTab={onSetActiveTab} />
			)}

			{/* Companies */}

			{/* Collections */}
		</VStack>
	);
};

export default AllTab;
