import { FC, memo } from 'react';

import { useConst } from '@chakra-ui/react';

import { compact } from 'lodash';

import VerticalPoster from '../VerticalPoster';
import { formatDate, formatMediaTypeLabel, getGenreLabelsByIDs, getImageSize } from '../../../common/utils';
import { useSelector } from '../../../common/hooks';

import { MovieVerticalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const MovieVerticalPoster: FC<MovieVerticalPosterProps> = (props) => {
	const genres = useSelector((state) => state.options.data.genres.movie);

	const { movie, subtitle, ...rest } = props;
	const { title, poster_path, vote_average, vote_count, release_date, genre_ids } = movie;

	const alt = useConst<string>(
		title
			? `${title} ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} poster`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} poster`
	);

	const defaultSubtitle =
		!!release_date || !!genre_ids
			? `${compact([
					release_date ? formatDate({ date: release_date, section: 'year' }) : undefined,
					genre_ids ? getGenreLabelsByIDs({ genres, ids: genre_ids }) : undefined
			  ]).join(' • ')}`
			: undefined;

	return (
		<VerticalPoster<'movie'>
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
		/>
	);
};

export default memo(MovieVerticalPoster);
