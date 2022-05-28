import { ReactElement } from 'react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { handleReturnDate, handleReturnGenresByID, handleReturnImageSize } from '../../../../../common/utils';
import VerticalPoster from '../../../../../components/Poster/Vertical';

import { VerticalMoviePosterProps } from './types';

const thumbnail = handleReturnImageSize('poster', 'thumbnail');
const full = handleReturnImageSize('poster', 'full');

const VerticalMoviePoster = (props: VerticalMoviePosterProps): ReactElement => {
	const { movie, width, isLoading = true } = props;
	const { title, poster_path, vote_average, release_date, genre_ids } = movie || {};

	return (
		<VerticalPoster
			width={width || '100%'}
			mediaItem={movie ? { ...movie } : undefined}
			mediaType='movie'
			image={{
				alt: `${title || ''} movie poster`,
				src: poster_path || '',
				size: { thumbnail, full }
			}}
			rating={vote_average || null}
			title={title || ''}
			subtitle={`${compact([
				!(isNil(release_date) || isEmpty(release_date))
					? `${handleReturnDate(release_date || '', 'year')} `
					: undefined,
				!(isNil(genre_ids) || isEmpty(genre_ids))
					? `${handleReturnGenresByID(genre_ids || [], 'movie')}`
					: undefined
			]).join(' • ')}`}
			isLoading={isLoading}
		/>
	);
};

export default VerticalMoviePoster;
