import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import LoadMore from '../../../../components/Clickable/LoadMore';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import VerticalMovies from '../../../Movies/components/Orientation/Vertical';

import { MoviesProps } from './types';

const incrementBy = 20;

const Movies = ({ movies }: MoviesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={4}>
			<VerticalMovies
				isError={movies.length === 0}
				isSuccess={movies.length > 0}
				isLoading={false}
				movies={movies.filter((_movie, index) => index < totalVisible)}
			/>

			<ScaleFade
				in={movies.length > 0 && movies.length > incrementBy}
				unmountOnExit
				style={{ width: isSm ? '100%' : 'auto' }}
			>
				<LoadMore
					color={color}
					amount={totalVisible}
					total={movies.length}
					label='Movies'
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default Movies;
