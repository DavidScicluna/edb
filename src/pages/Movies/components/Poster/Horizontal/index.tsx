import { ReactElement } from 'react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';


import { handleReturnDate, handleReturnGenresByID, handleReturnImageSize } from '../../../../../common/utils';
import HorizontalPoster from '../../../../../components/Poster/Horizontal';

import { HorizontalMoviePosterProps } from './types';

const thumbnail = handleReturnImageSize('poster', 'thumbnail');
const full = handleReturnImageSize('poster', 'full');

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
				size: { thumbnail, full }
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
