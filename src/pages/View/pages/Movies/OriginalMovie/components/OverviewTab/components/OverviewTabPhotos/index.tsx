import { FC, useState, useEffect } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { range, sample, shuffle } from 'lodash';

import { useMovieContext } from '../../../../common/hooks';
import { movieTabs } from '../../../..';
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

const OverviewTabPhotos: FC = () => {
	const { movieQuery, imagesQuery, onSetActiveTab } = useMovieContext();
	const { data: movie } = movieQuery || {};
	const { title } = movie || {};
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
			mediaType='movie'
			photos={[...photosDebounced]}
			dummyPhotos={[...dummyPhotos]}
			title='Photos'
			subtitle={`This list is showcasing some of the posters & backdrops that were used for ${
				title ? title : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}`
			}`}
			emptyLabel={title ? `${title} photos` : 'Photos'}
			total={posters.length + backdrops.length}
			isLoading={isFetching || isLoading}
			isError={isError}
			isSuccess={isSuccess}
			onFooterClick={() =>
				onSetActiveTab({ index: movieTabs.findIndex(({ path }) => path.hash === 'photos') || 4 })
			}
		/>
	);
};

export default OverviewTabPhotos;
