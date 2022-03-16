import { ReactElement } from 'react';

import { HorizontalCollectionPosterProps } from './types';

import { handleReturnImageSize } from '../../../../../../../../../common/utils';
import HorizontalPoster from '../../../../../../../../../components/Poster/Horizontal';

const thumbnail = handleReturnImageSize('poster', 'thumbnail');
const full = handleReturnImageSize('poster', 'full');

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
				size: { thumbnail, full }
			}}
			title={name || ''}
			subtitle={overview || ''}
			isLoading={isLoading}
		/>
	);
};

export default HorizontalCollectionPoster;
