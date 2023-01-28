import { FC, memo } from 'react';

import { useConst } from '@chakra-ui/react';

import { formatMediaTypeLabel, getImageSize } from '../../../common/utils';
import HorizontalPoster from '../HorizontalPoster';

import { CollectionHorizontalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const CollectionHorizontalPoster: FC<CollectionHorizontalPosterProps> = (props) => {
	const { collection, subtitle, description, ...rest } = props;
	const { name, poster_path, parts = [], overview } = collection;

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })} poster`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })} poster`
	);

	const defaultSubtitle =
		parts.length > 0
			? `Total of ${parts.length} ${formatMediaTypeLabel({
					type: parts.length === 1 ? 'single' : 'multiple',
					mediaType: 'movie'
			  })}`
			: undefined;
	const defaultDescription = overview;

	return (
		<HorizontalPoster<'collection'>
			{...rest}
			mediaItem={{ ...collection }}
			mediaType='collection'
			image={{
				alt,
				src: poster_path || '',
				size: { full, thumbnail }
			}}
			title={name || ''}
			subtitle={subtitle || defaultSubtitle || ''}
			description={description || defaultDescription || ''}
		/>
	);
};

export default memo(CollectionHorizontalPoster);
