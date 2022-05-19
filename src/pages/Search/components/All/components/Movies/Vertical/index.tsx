import { ReactElement } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';


import { useSelector } from '../../../../../../../common/hooks';
import LoadMore from '../../../../../../../components/Clickable/LoadMore';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';
import VerticalMovies from '../../../../../../Movies/components/Orientation/Vertical';

import { VerticalSearchMoviesProps } from './types';

const VerticalSearchMovies = ({ query, movies, moviesQuery }: VerticalSearchMoviesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

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
					color={color}
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
