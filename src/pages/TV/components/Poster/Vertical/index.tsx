import { ReactElement } from 'react';

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
			subtitle={`${[
				`${handleReturnDate(first_air_date || '', 'year')}` || 'N/A',
				`${handleReturnGenresByID(genre_ids || [], 'tv')}`
			]
				.filter((subtitle) => subtitle)
				.join(' • ')}`}
			isLoading={isLoading}
		/>
	);
};

export default VerticalTVShowPoster;