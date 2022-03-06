import { ReactElement } from 'react';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { MoviesProps } from './types';

import LoadMore from '../../../../components/Clickable/LoadMore';
import VerticalMovies from '../../../Movies/components/Orientation/Vertical';

const Movies = ({ movies, query, onLoadMore }: MoviesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<VStack width='100%' spacing={4}>
			<VerticalMovies
				isError={query.isError}
				isSuccess={query.isSuccess}
				isLoading={query.isFetching || query.isLoading}
				movies={movies?.results || []}
			/>

			<Center style={{ width: isSm ? '100%' : 'auto' }}>
				<LoadMore
					amount={movies?.results?.length || 0}
					total={movies?.total_results || 0}
					label='Trending Movies'
					isLoading={query.isFetching || query.isLoading}
					isButtonVisible={query.hasNextPage && !query.isError}
					onClick={() => onLoadMore()}
				/>
			</Center>
		</VStack>
	);
};

export default Movies;
