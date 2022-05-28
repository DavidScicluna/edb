import { ReactElement } from 'react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { handleReturnDate, handleReturnGenresByID, handleReturnImageSize } from '../../../../../common/utils';
import VerticalPoster from '../../../../../components/Poster/Vertical';

import { VerticalTVShowPosterProps } from './types';

const thumbnail = handleReturnImageSize('poster', 'thumbnail');
const full = handleReturnImageSize('poster', 'full');

const VerticalTVShowPoster = (props: VerticalTVShowPosterProps): ReactElement => {
	const { show, width, isLoading = true } = props;
	const { name, poster_path, vote_average, first_air_date, genre_ids } = show || {};

	return (
		<VerticalPoster
			width={width || '100%'}
			mediaItem={show ? { ...show } : undefined}
			mediaType='tv'
			image={{
				alt: `${name || ''} tv show poster`,
				src: poster_path || '',
				size: { thumbnail, full }
			}}
			rating={vote_average || null}
			title={name || ''}
			subtitle={`${compact([
				!(isNil(first_air_date) || isEmpty(first_air_date))
					? `${handleReturnDate(first_air_date || '', 'year')}`
					: undefined,
				!(isNil(genre_ids) || isEmpty(genre_ids))
					? `${handleReturnGenresByID(genre_ids || [], 'tv')}`
					: undefined
			]).join(' • ')}`}
			isLoading={isLoading}
		/>
	);
};

export default VerticalTVShowPoster;
