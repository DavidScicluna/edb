import { ReactElement } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import { VerticalSearchMoviesProps } from './types';

import LoadMore from '../../../../../../../components/Clickable/LoadMore';
import VerticalMovies from '../../../../../../Movies/components/Orientation/Vertical';

const VerticalSearchMovies = ({ query, movies, moviesQuery }: VerticalSearchMoviesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<VStack width='100%' spacing={4}>
			<VerticalMovies
				isError={moviesQuery.isError}
				isSuccess={moviesQuery.isSuccess}
				isLoading={moviesQuery.isFetching || moviesQuery.isLoading}
				movies={movies?.results || []}
			/>

			<ScaleFade in={!moviesQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
				<LoadMore
					amount={movies?.results?.length || 0}
					total={movies?.total_results || 0}
					label={`Movies with "${query}"`}
					isLoading={moviesQuery.isFetching || moviesQuery.isLoading}
					isButtonVisible={(moviesQuery.hasNextPage || true) && !moviesQuery.isError}
					onClick={moviesQuery.fetchNextPage}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default VerticalSearchMovies;
