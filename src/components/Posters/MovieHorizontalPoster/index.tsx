import { FC, memo } from 'react';

import { useConst } from '@chakra-ui/react';

import { compact } from 'lodash';

import { formatDate, formatMediaTypeLabel, getGenreLabelsByIDs, getImageSize } from '../../../common/utils';
import HorizontalPoster from '../HorizontalPoster';
import { useSelector } from '../../../common/hooks';

import { MovieHorizontalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const MovieHorizontalPoster: FC<MovieHorizontalPosterProps> = (props) => {
	const genres = useSelector((state) => state.options.data.genres.movie);

	const { movie, subtitle, description, ...rest } = props;
	const { title, poster_path, vote_average, vote_count, release_date, genre_ids, overview } = movie;

	const alt = useConst<string>(
		title
			? `${title} ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} poster`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} poster`
	);

	const defaultSubtitle =
		!!release_date || !!genre_ids
			? `${compact([
					release_date ? formatDate({ date: release_date }) : undefined,
					genre_ids ? getGenreLabelsByIDs({ genres, ids: genre_ids }) : undefined
			  ]).join(' • ')}`
			: undefined;
	const defaultDescription = overview;

	return (
		<HorizontalPoster<'movie'>
			{...rest}
			mediaItem={{ ...movie }}
			mediaType='movie'
			image={{
				alt,
				src: poster_path || '',
				size: { full, thumbnail }
			}}
			rating={{ rating: vote_average, count: vote_count }}
			title={title || ''}
			subtitle={subtitle || defaultSubtitle || ''}
			description={description || defaultDescription || ''}
		/>
	);
};

export default memo(MovieHorizontalPoster);
