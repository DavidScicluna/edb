import { ReactElement } from 'react';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { MoviesProps } from './types';

import { useSelector } from '../../../../common/hooks';
import LoadMore from '../../../../components/Clickable/LoadMore';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import VerticalMovies from '../../../Movies/components/Orientation/Vertical';

const Movies = ({ movies, query, onLoadMore }: MoviesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

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
					color={color}
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
