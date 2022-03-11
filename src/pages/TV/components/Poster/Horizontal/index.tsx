import { ReactElement } from 'react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { HorizontalTVShowPosterProps } from './types';

import { handleReturnDate, handleReturnGenresByID } from '../../../../../common/utils';
import HorizontalPoster from '../../../../../components/Poster/Horizontal';

const HorizontalTVShowPoster = (props: HorizontalTVShowPosterProps): ReactElement => {
	const { show, isLoading = true } = props;
	const { name, poster_path, vote_average, vote_count, first_air_date, genre_ids, overview } = show || {};

	return (
		<HorizontalPoster
			mediaItem={show ? { ...show } : undefined}
			mediaType='tv'
			image={{
				alt: `${name || ''} tv show poster`,
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
			title={name || ''}
			subtitle={`${compact([
				!(isNil(first_air_date) || isEmpty(first_air_date))
					? `${handleReturnDate(first_air_date || '', 'full')}`
					: undefined,
				!(isNil(genre_ids) || isEmpty(genre_ids))
					? `${handleReturnGenresByID(genre_ids || [], 'tv')}`
					: undefined
			]).join(' • ')}`}
			description={overview || ''}
			isLoading={isLoading}
		/>
	);
};

export default HorizontalTVShowPoster;
