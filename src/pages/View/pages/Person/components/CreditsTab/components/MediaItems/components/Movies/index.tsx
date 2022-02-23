import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import _ from 'lodash';

import { MoviesProps } from './types';

import { handleReturnDate } from '../../../../../../../../../../common/utils';
import LoadMore from '../../../../../../../../../../components/Clickable/LoadMore';
import VerticalGrid from '../../../../../../../../../../components/Grid/Vertical';
import HorizontalPoster from '../../../../../../../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../../../../../../../components/Poster/Vertical';
import { Movie } from '../../types';

const incrementBy = 20;

const Movies = ({ movies, job, label }: MoviesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={4}>
			<VerticalGrid>
				{({ displayMode }) =>
					movies
						.filter((_movie, index) => index < totalVisible)
						.map((movie: Movie) =>
							displayMode === 'grid' ? (
								<VerticalPoster
									key={movie.id}
									mediaItem={movie ? { ...movie } : undefined}
									mediaType='movie'
									image={{
										alt: `${movie?.title || ''} movie poster`,
										src: movie?.poster_path || '',
										size: {
											thumbnail: 'w92',
											full: 'original'
										}
									}}
									rating={movie?.vote_average || null}
									title={movie?.title || ''}
									subtitle={`${_.compact([
										!_.isNil(movie?.release_date) && !_.isEmpty(movie?.release_date)
											? `${handleReturnDate(movie.release_date || '', 'year')}`
											: undefined,
										!_.isNil(movie?.character) && !_.isEmpty(movie?.character)
											? `As ${movie.character}`
											: !_.isNil(movie?.job) && !_.isEmpty(movie?.job)
											? movie?.job
											: undefined
									]).join(' • ')}`}
									isLoading={false}
								/>
							) : (
								<HorizontalPoster
									key={movie.id}
									mediaItem={movie ? { ...movie } : undefined}
									mediaType='movie'
									image={{
										alt: `${movie?.title || ''} movie poster`,
										src: movie?.poster_path || '',
										size: {
											thumbnail: 'w92',
											full: 'original'
										}
									}}
									rating={{
										rating: movie?.vote_average || null,
										count: movie?.vote_count || null
									}}
									title={movie?.title || ''}
									subtitle={`${_.compact([
										!_.isNil(movie?.release_date) && !_.isEmpty(movie?.release_date)
											? `${handleReturnDate(movie.release_date || '', 'full')}`
											: undefined,
										!_.isNil(movie?.character) && !_.isEmpty(movie?.character)
											? `As ${movie.character}`
											: !_.isNil(movie?.job) && !_.isEmpty(movie?.job)
											? movie?.job
											: undefined
									]).join(' • ')}`}
									description={movie?.overview || ''}
									isLoading={false}
								/>
							)
						)
				}
			</VerticalGrid>

			<ScaleFade
				in={movies.length > 0 && movies.length > incrementBy}
				unmountOnExit
				style={{ width: isSm ? '100%' : 'auto' }}
			>
				<LoadMore
					amount={totalVisible}
					total={movies.length}
					label={`"${label}" ${job} Movies`}
					onClick={() => setTotalVisible(totalVisible + incrementBy)}
				/>
			</ScaleFade>
		</VStack>
	);
};

export default Movies;
