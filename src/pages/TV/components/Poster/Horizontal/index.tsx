import { ReactElement } from 'react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { handleReturnDate, handleReturnGenresByID, handleReturnImageSize } from '../../../../../common/utils';
import HorizontalPoster from '../../../../../components/Poster/Horizontal';

import { HorizontalTVShowPosterProps } from './types';

const thumbnail = handleReturnImageSize('poster', 'thumbnail');
const full = handleReturnImageSize('poster', 'full');

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
				size: { thumbnail, full }
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
