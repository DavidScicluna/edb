import { FC } from 'react';

import { useConst } from '@chakra-ui/react';

import { compact } from 'lodash';

import { formatDate, formatMediaTypeLabel, getGenreLabelsByIDs, getImageSize } from '../../../common/utils';
import VerticalPoster from '../VerticalPoster';
import { useSelector } from '../../../common/hooks';

import { TVShowVerticalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const TVShowVerticalPoster: FC<TVShowVerticalPosterProps> = (props) => {
	const genres = useSelector((state) => state.options.data.genres.tv);

	const { show, subtitle, ...rest } = props;
	const { name, poster_path, vote_average, vote_count, first_air_date, genre_ids } = show || {};

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} poster`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} poster`
	);

	const defaultSubtitle =
		!!first_air_date || !!genre_ids
			? `${compact([
					first_air_date ? formatDate({ date: first_air_date, section: 'year' }) : undefined,
					genre_ids ? getGenreLabelsByIDs({ genres, ids: genre_ids }) : undefined
			  ]).join(' • ')}`
			: undefined;

	return (
		<VerticalPoster<'tv'>
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
		/>
	);
};

export default TVShowVerticalPoster;
