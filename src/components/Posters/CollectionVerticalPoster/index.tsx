import { FC, memo } from 'react';

import { useConst } from '@chakra-ui/react';

import VerticalPoster from '../VerticalPoster';
import { formatMediaTypeLabel, getImageSize } from '../../../common/utils';

import { CollectionVerticalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const CollectionVerticalPoster: FC<CollectionVerticalPosterProps> = (props) => {
	const { collection, subtitle, ...rest } = props;
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
			: overview
			? overview
			: undefined;

	return (
		<VerticalPoster<'collection'>
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
		/>
	);
};

export default memo(CollectionVerticalPoster);
