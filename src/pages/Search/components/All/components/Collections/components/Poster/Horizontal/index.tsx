import { ReactElement } from 'react';

import { HorizontalCollectionPosterProps } from './types';

import HorizontalPoster from '../../../../../../../../../components/Poster/Horizontal';

const HorizontalCollectionPoster = (props: HorizontalCollectionPosterProps): ReactElement => {
	const { collection, isLoading = true } = props;
	const { name, poster_path, overview } = collection || {};

	return (
		<HorizontalPoster
			mediaItem={collection ? { ...collection } : undefined}
			mediaType='collection'
			image={{
				alt: `${name || ''} collection poster`,
				src: poster_path || '',
				size: {
					thumbnail: 'w92',
					full: 'original'
				}
			}}
			title={name || ''}
			subtitle={overview || ''}
			isLoading={isLoading}
		/>
	);
};

export default HorizontalCollectionPoster;