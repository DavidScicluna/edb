import { ReactElement } from 'react';

import compact from 'lodash/compact';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { HorizontalMoviePosterProps } from './types';

import { handleReturnDate, handleReturnGenresByID } from '../../../../../common/utils';
import HorizontalPoster from '../../../../../components/Poster/Horizontal';

const HorizontalMoviePoster = (props: HorizontalMoviePosterProps): ReactElement => {
	const { movie, isLoading = true } = props;
	const { title, poster_path, vote_average, vote_count, overview, release_date, genre_ids } = movie || {};

	return (
		<HorizontalPoster
			mediaItem={movie ? { ...movie } : undefined}
			mediaType='movie'
			image={{
				alt: `${title || ''} movie poster`,
				src: poster_path || '',
				size: {
					thumbnail: 'w92',
					full: 'original'
				}
			}}
			rating={{
				rating: vote_average || null,
				count: vote_count || null
			}}
			title={title || ''}
			subtitle={`${compact([
				!(isNil(release_date) || isEmpty(release_date))
					? `${handleReturnDate(release_date || '', 'full')}`
					: undefined,
				!(isNil(genre_ids) || isEmpty(genre_ids))
					? `${handleReturnGenresByID(genre_ids || [], 'movie')}`
					: undefined
			]).join(' • ')}`}
			description={overview || ''}
			isLoading={isLoading}
		/>
	);
};

export default HorizontalMoviePoster;
