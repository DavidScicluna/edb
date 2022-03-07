import { ReactElement } from 'react';

import _ from 'lodash';

import { VerticalMoviePosterProps } from './types';

import { handleReturnDate, handleReturnGenresByID } from '../../../../../common/utils';
import VerticalPoster from '../../../../../components/Poster/Vertical';

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
				size: {
					thumbnail: 'w92',
					full: 'original'
				}
			}}
			rating={vote_average || null}
			title={title || ''}
			subtitle={`${_.compact([
				!(_.isNil(release_date) || _.isEmpty(release_date))
					? `${handleReturnDate(release_date || '', 'year')} `
					: undefined,
				!(_.isNil(genre_ids) || _.isEmpty(genre_ids))
					? `${handleReturnGenresByID(genre_ids || [], 'movie')}`
					: undefined
			]).join(' • ')}`}
			isLoading={isLoading}
		/>
	);
};

export default VerticalMoviePoster;
