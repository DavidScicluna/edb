import { FC, memo } from 'react';

import { useConst } from '@chakra-ui/react';

import { compact } from 'lodash';

import { formatDate, formatMediaTypeLabel, getGenreLabelsByIDs, getImageSize } from '../../../common/utils';
import HorizontalPoster from '../HorizontalPoster';
import { useSelector } from '../../../common/hooks';

import { TVShowHorizontalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const TVShowHorizontalPoster: FC<TVShowHorizontalPosterProps> = (props) => {
	const genres = useSelector((state) => state.options.data.genres.tv);

	const { show, subtitle, description, ...rest } = props;
	const { name, poster_path, vote_average, vote_count, first_air_date, genre_ids, overview } = show || {};

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} poster`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} poster`
	);

	const defaultSubtitle =
		!!first_air_date || !!genre_ids
			? `${compact([
					first_air_date ? formatDate({ date: first_air_date }) : undefined,
					genre_ids ? getGenreLabelsByIDs({ genres, ids: genre_ids }) : undefined
			  ]).join(' • ')}`
			: undefined;
	const defaultDescription = overview;

	return (
		<HorizontalPoster<'tv'>
			{...rest}
			mediaItem={{ ...show }}
			mediaType='tv'
			image={{
				alt,
				src: poster_path || '',
				size: { full, thumbnail }
			}}
			rating={{ rating: vote_average, count: vote_count }}
			title={name || ''}
			subtitle={subtitle || defaultSubtitle || ''}
			description={description || defaultDescription || ''}
		/>
	);
};

export default memo(TVShowHorizontalPoster);
