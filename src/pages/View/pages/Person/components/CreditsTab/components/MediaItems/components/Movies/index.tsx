import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../../../../../../common/hooks';
import { handleReturnDate, handleReturnImageSize } from '../../../../../../../../../../common/utils';
import LoadMore from '../../../../../../../../../../components/Clickable/LoadMore';
import VerticalGrid from '../../../../../../../../../../components/Grid/Vertical';
import HorizontalPoster from '../../../../../../../../../../components/Poster/Horizontal';
import VerticalPoster from '../../../../../../../../../../components/Poster/Vertical';
import { defaultUser, getUser } from '../../../../../../../../../../store/slices/Users';
import { Movie } from '../../types';

import { MoviesProps } from './types';

const incrementBy = 20;

const thumbnail = handleReturnImageSize('poster', 'thumbnail');
const full = handleReturnImageSize('poster', 'full');

const Movies = ({ movies, job, label }: MoviesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

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
										size: { thumbnail, full }
									}}
									rating={movie?.vote_average || null}
									title={movie?.title || ''}
									subtitle={`${compact([
										!(isNil(movie?.release_date) || isEmpty(movie?.release_date))
											? `${handleReturnDate(movie.release_date || '', 'year')}`
											: undefined,
										!(isNil(movie?.character) || isEmpty(movie?.character))
											? `As ${movie.character}`
											: !(isNil(movie?.job) || isEmpty(movie?.job))
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
									subtitle={`${compact([
										!(isNil(movie?.release_date) || isEmpty(movie?.release_date))
											? `${handleReturnDate(movie.release_date || '', 'full')}`
											: undefined,
										!(isNil(movie?.character) || isEmpty(movie?.character))
											? `As ${movie.character}`
											: !(isNil(movie?.job) || isEmpty(movie?.job))
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
					color={color}
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
