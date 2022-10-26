import { FC } from 'react';

import { compact } from 'lodash';

import VerticalPoster from '../VerticalPoster';
import { getImageSize, handleReturnDate, handleReturnGenresByID } from '../../../common/utils';

import { MovieVerticalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const MovieVerticalPoster: FC<MovieVerticalPosterProps> = (props) => {
	const { movie, ...rest } = props;
	const { title, poster_path, vote_average, vote_count, release_date, genre_ids } = movie;

	return (
		<VerticalPoster<'movie'>
			{...rest}
			mediaItem={{ ...movie }}
			mediaType='movie'
			image={{
				alt: title ? `${title || ''} movie poster` : 'Movie poster',
				src: poster_path || '',
				size: { full, thumbnail }
			}}
			rating={{ rating: vote_average, count: vote_count }}
			title={title || ''}
			subtitle={
				!!release_date || !!genre_ids
					? `${compact([
							release_date ? `${handleReturnDate(release_date || '', 'year')} ` : undefined,
							genre_ids ? `${handleReturnGenresByID(genre_ids || [], 'movie')}` : undefined
					  ]).join(' • ')}`
					: undefined
			}
		/>
	);
};

export default MovieVerticalPoster;
