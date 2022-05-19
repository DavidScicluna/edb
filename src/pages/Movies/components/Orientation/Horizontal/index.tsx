import { ReactElement } from 'react';

import range from 'lodash/range';


import { PartialMovie } from '../../../../../common/types/movie';
import Empty from '../../../../../components/Empty';
import Error from '../../../../../components/Error';
import VerticalMoviePoster from '../../Poster/Vertical';

import { HorizontalMoviesProps } from './types';

const HorizontalMovies = (props: HorizontalMoviesProps): ReactElement => {
	const { isError = false, isSuccess = false, isLoading = true, movies } = props;

	return !isLoading && isError ? (
		<Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='transparent' />
	) : !isLoading && isSuccess && movies && movies.length === 0 ? (
		<Empty label='Movies list is currently empty!' variant='transparent' />
	) : !isLoading && isSuccess && movies && movies.length > 0 ? (
		<>
			{movies.map((movie: PartialMovie) => (
				<VerticalMoviePoster
					key={movie.id}
					width={['185px', '205px', '230px']}
					movie={movie}
					isLoading={false}
				/>
			))}
		</>
	) : (
		<>
			{range(0, 20).map((_dummy, index: number) => (
				<VerticalMoviePoster key={index} width={['185px', '205px', '230px']} isLoading />
			))}
		</>
	);
};

export default HorizontalMovies;
