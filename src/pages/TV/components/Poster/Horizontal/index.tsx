import { ReactElement } from 'react';

import _ from 'lodash';

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
			subtitle={`${_.compact([
				!_.isNil(first_air_date) && !_.isEmpty(first_air_date)
					? `${handleReturnDate(first_air_date || '', 'full')}`
					: undefined,
				!_.isNil(genre_ids) && !_.isEmpty(genre_ids)
					? `${handleReturnGenresByID(genre_ids || [], 'tv')}`
					: undefined
			]).join(' • ')}`}
			description={overview || ''}
			isLoading={isLoading}
		/>
	);
};

export default HorizontalTVShowPoster;
