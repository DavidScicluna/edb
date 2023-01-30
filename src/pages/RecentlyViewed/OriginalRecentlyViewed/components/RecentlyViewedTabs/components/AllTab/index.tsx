import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useSelector } from '../../../../../../../common/hooks';

import AllTabCollections from './components/AllTabCollections';
import AllTabMovies from './components/AllTabMovies';
import AllTabPeople from './components/AllTabPeople';
import AllTabShows from './components/AllTabShows';
import { AllTabProps } from './types';

const AllTab: FC<AllTabProps> = (props) => {
	const { spacing } = useLayoutContext();

	const {
		movie = [],
		tv = [],
		person = [],
		collection = []
	} = useSelector((state) => state.users.data.activeUser.data.recentlyViewed);

	return (
		<VStack width='100%' spacing={spacing}>
			{/* Movies */}
			{movie.length > 0 && <AllTabMovies {...props} />}

			{/* TV Shows */}
			{tv.length > 0 && <AllTabShows {...props} />}

			{/* People */}
			{person.length > 0 && <AllTabPeople {...props} />}

			{/* Collections */}
			{collection.length > 0 && <AllTabCollections {...props} />}
		</VStack>
	);
};

export default AllTab;
