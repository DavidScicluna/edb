import { FC, useState, useEffect } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { range, sample, shuffle } from 'lodash';

import { useCollectionContext } from '../../../../common/hooks';
import ViewPhotosHorizontalGrid from '../../../../../../../components/ViewPhotosHorizontalGrid/OriginalViewPhotosHorizontalGrid';
import {
	ViewPhotosHorizontalGridDummyPhotos,
	ViewPhotosHorizontalGridDummyPhoto
} from '../../../../../../../components/ViewPhotosHorizontalGrid/common/types';
import {
	ViewPhotosHorizontalGridPhotos,
	ViewPhotosHorizontalGridPhoto
} from '../../../../../../../components/ViewPhotosHorizontalGrid/OriginalViewPhotosHorizontalGrid/types';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { getCollectionTabIndex } from '../../../../../common/utils';

const OverviewTabPhotos: FC = () => {
	const { collectionQuery, imagesQuery, onSetActiveTab } = useCollectionContext();
	const { data: collection } = collectionQuery || {};
	const { name, parts = [] } = collection || {};
	const { data: images, isFetching, isLoading, isError, isSuccess } = imagesQuery || {};
	const { posters = [], backdrops = [] } = images || {};

	const [photos, setPhotos] = useState<ViewPhotosHorizontalGridPhotos>([]);
	const photosDebounced = useDebounce<ViewPhotosHorizontalGridPhotos>(photos, 'slow');

	const dummyPhotos = useConst<ViewPhotosHorizontalGridDummyPhotos>(
		range(10).map(() => {
			return { orientation: sample(['portrait', 'landscape']) } as ViewPhotosHorizontalGridDummyPhoto;
		})
	);

	useEffect(() => {
		if (photosDebounced.length === 0 && posters.length + backdrops.length > 0) {
			setPhotos(
				shuffle([
					...posters
						.filter((_poster, index) => index < 10)
						.map((poster) => {
							return { image: poster, orientation: 'portrait' } as ViewPhotosHorizontalGridPhoto;
						}),
					...backdrops
						.filter((_backdrop, index) => index < 10)
						.map((backdrop) => {
							return { image: backdrop, orientation: 'landscape' } as ViewPhotosHorizontalGridPhoto;
						})
				])
			);
		}
	}, [posters, backdrops]);

	return (
		<ViewPhotosHorizontalGrid
			mediaType='collection'
			photos={[...photosDebounced]}
			dummyPhotos={[...dummyPhotos]}
			title='Photos'
			subtitle={`This list is showcasing some of the posters & backdrops that were used for the ${formatMediaTypeLabel(
				{ type: parts.length === 1 ? 'single' : 'multiple', mediaType: 'movie' }
			)} in the ${name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })}`}
			emptyLabel={name ? `${name} photos` : 'Photos'}
			total={posters.length + backdrops.length}
			isLoading={isFetching || isLoading}
			isError={isError}
			isSuccess={isSuccess}
			onFooterClick={() => onSetActiveTab({ index: getCollectionTabIndex('photos') })}
		/>
	);
};

export default OverviewTabPhotos;
