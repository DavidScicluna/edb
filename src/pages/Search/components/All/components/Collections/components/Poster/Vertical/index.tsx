import { ReactElement } from 'react';

import { VerticalCollectionPosterProps } from './types';

import { handleReturnImageSize } from '../../../../../../../../../common/utils';
import VerticalPoster from '../../../../../../../../../components/Poster/Vertical';

const thumbnail = handleReturnImageSize('poster', 'thumbnail');
const full = handleReturnImageSize('poster', 'full');

const VerticalCollectionPoster = (props: VerticalCollectionPosterProps): ReactElement => {
	const { collection, width, isLoading = true } = props;
	const { name, poster_path, overview } = collection || {};

	return (
		<VerticalPoster
			width={width || '100%'}
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

export default VerticalCollectionPoster;
