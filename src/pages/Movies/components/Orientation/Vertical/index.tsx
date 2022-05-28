import { ReactElement } from 'react';

import range from 'lodash/range';

import { PartialMovie } from '../../../../../common/types/movie';
import Empty from '../../../../../components/Empty';
import Error from '../../../../../components/Error';
import VerticalGrid from '../../../../../components/Grid/Vertical';
import HorizontalMoviePoster from '../../Poster/Horizontal';
import VerticalMoviePoster from '../../Poster/Vertical';

import { VerticalMoviesProps } from './types';

const VerticalMovies = (props: VerticalMoviesProps): ReactElement => {
	const { isError = false, isSuccess = false, isLoading = true, movies } = props;

	return !isLoading && isError ? (
		<Error label='Oh no! Something went wrong' description='Failed to fetch movies list!' variant='outlined' />
	) : !isLoading && isSuccess && movies && movies.length === 0 ? (
		<Empty label='Movies list is currently empty!' variant='outlined' />
	) : !isLoading && isSuccess && movies && movies.length > 0 ? (
		<VerticalGrid>
			{({ displayMode }) =>
				movies.map((movie: PartialMovie) =>
					displayMode === 'list' ? (
						<HorizontalMoviePoster key={movie.id} movie={movie} isLoading={false} />
					) : (
						<VerticalMoviePoster key={movie.id} movie={movie} isLoading={false} />
					)
				)
			}
		</VerticalGrid>
	) : (
		<VerticalGrid>
			{({ displayMode }) =>
				range(0, isSuccess && movies && movies.length > 0 ? movies.length : 20).map((_dummy, index: number) =>
					displayMode === 'list' ? (
						<HorizontalMoviePoster key={index} isLoading />
					) : (
						<VerticalMoviePoster key={index} isLoading />
					)
				)
			}
		</VerticalGrid>
	);
};

export default VerticalMovies;
