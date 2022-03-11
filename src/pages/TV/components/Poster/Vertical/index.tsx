import { ReactElement } from 'react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { VerticalTVShowPosterProps } from './types';

import { handleReturnDate, handleReturnGenresByID } from '../../../../../common/utils';
import VerticalPoster from '../../../../../components/Poster/Vertical';

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
				size: {
					thumbnail: 'w92',
					full: 'original'
				}
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
