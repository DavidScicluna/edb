import { FC } from 'react';

import {
	useMediaTypeImagesQuery,
	useMediaTypeQuery,
	useMediaTypeVideosQuery
} from '../../../../../../../common/queries';
import QuickViewModalDummyPoster from '../QuickViewModalDummyPoster';
import QuickViewModalStructure from '../QuickViewModalStructure';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import QuickViewModalError from '../QuickViewModalError';
import QuickViewModalEmpty from '../QuickViewModalEmpty';

import QuickViewModalMovieContent from './components/QuickViewModalMovieContent';
import QuickViewModalMoviePoster from './components/QuickViewModalMoviePoster';
import { QuickViewModalMovieProps } from './types';
import QuickViewModalMovieDummyContent from './components/QuickViewModalMovieDummyContent';

const QuickViewModalMovie: FC<QuickViewModalMovieProps> = ({ id }) => {
	const movieQuery = useMediaTypeQuery<'movie'>({
		props: { mediaType: 'movie', id: Number(id) },
		config: { params: { append_to_response: 'release_dates' } }
	});

	const {
		data: movie,
		isFetching: isMovieFetching,
		isLoading: isMovieLoading,
		isError: isMovieError,
		isSuccess: isMovieSuccess,
		error: movieError,
		refetch: refetchMovie
	} = movieQuery;

	const { title } = movie || {};

	const imagesQuery = useMediaTypeImagesQuery({
		props: { mediaType: 'movie', id: Number(id) },
		options: { enabled: !!movie?.id }
	});

	const { posters = [], backdrops = [] } = imagesQuery.data || {};

	const videosQuery = useMediaTypeVideosQuery({
		props: { mediaType: 'movie', id: Number(id) },
		options: { enabled: !!movie?.id }
	});

	const { results: videos = [] } = videosQuery.data || {};

	return !(isMovieFetching || isMovieLoading) && isMovieError ? (
		<QuickViewModalError
			{...(movieError.response?.data || {})}
			label={title ? title : formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}
			refetch={refetchMovie}
		/>
	) : !(isMovieFetching || isMovieLoading) && isMovieSuccess && !movie ? (
		<QuickViewModalEmpty label={title ? title : formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} />
	) : !(isMovieFetching || isMovieLoading) && isMovieSuccess && !!movie ? (
		<QuickViewModalStructure
			renderPoster={() => <QuickViewModalMoviePoster movie={movie} />}
			renderContent={() => <QuickViewModalMovieContent movie={movie} />}
		/>
	) : (
		<QuickViewModalStructure
			renderPoster={() => <QuickViewModalDummyPoster />}
			renderContent={() => <QuickViewModalMovieDummyContent />}
		/>
	);
};

export default QuickViewModalMovie;
