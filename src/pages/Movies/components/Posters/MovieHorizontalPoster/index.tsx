import { FC } from 'react';

import { compact } from 'lodash';

import { getImageSize, handleReturnDate, handleReturnGenresByID } from '../../../../../common/utils';
import { HorizontalPoster } from '../../../../../components';

import { MovieHorizontalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const MovieHorizontalPoster: FC<MovieHorizontalPosterProps> = (props) => {
	const { movie, ...rest } = props;
	const { title, poster_path, vote_average, vote_count, release_date, genre_ids, overview } = movie;

	return (
		<HorizontalPoster<'movie'>
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
			description={overview || ''}
		/>
	);
};

export default MovieHorizontalPoster;
