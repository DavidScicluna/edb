import { FC } from 'react';

import { compact } from 'lodash';

import { getImageSize, handleReturnDate, handleReturnGenresByID } from '../../../../../common/utils';
import { VerticalPoster } from '../../../../../components';

import { TVShowVerticalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const TVShowVerticalPoster: FC<TVShowVerticalPosterProps> = (props) => {
	const { show, ...rest } = props;
	const { name, poster_path, vote_average, vote_count, first_air_date, genre_ids } = show || {};

	return (
		<VerticalPoster<'tv'>
			{...rest}
			mediaItem={{ ...show }}
			mediaType='tv'
			image={{
				alt: name ? `${name || ''} TV Show poster` : 'TV Show poster',
				src: poster_path || '',
				size: { full, thumbnail }
			}}
			rating={{ rating: vote_average, count: vote_count }}
			title={name || ''}
			subtitle={
				!!first_air_date || !!genre_ids
					? `${compact([
							first_air_date ? `${handleReturnDate(first_air_date || '', 'year')}` : undefined,
							genre_ids ? `${handleReturnGenresByID(genre_ids || [], 'tv')}` : undefined
					  ]).join(' • ')}`
					: undefined
			}
		/>
	);
};

export default TVShowVerticalPoster;
