import { FC, useState, useEffect } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { range, shuffle } from 'lodash';

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
import { useEpisodeContext } from '../../../../common/hooks';
import { getEpisodeTabIndex } from '../../../../../common/utils';

const OverviewTabPhotos: FC = () => {
	const { episodeQuery, imagesQuery, onSetActiveTab } = useEpisodeContext();

	const { data: episode } = episodeQuery || {};
	const { name, episode_number: number } = episode || {};

	const { data: images, isFetching, isLoading, isError, isSuccess } = imagesQuery || {};
	const { stills = [] } = images || {};

	const [photos, setPhotos] = useState<ViewPhotosHorizontalGridPhotos>([]);
	const photosDebounced = useDebounce<ViewPhotosHorizontalGridPhotos>(photos, 'slow');

	const dummyPhotos = useConst<ViewPhotosHorizontalGridDummyPhotos>(
		range(10).map(() => {
			return { orientation: 'portrait' } as ViewPhotosHorizontalGridDummyPhoto;
		})
	);

	useEffect(() => {
		if (photosDebounced.length === 0 && stills.length > 0) {
			setPhotos(
				shuffle([
					...stills
						.filter((_still, index) => index < 10)
						.map((poster) => {
							return { image: poster, orientation: 'portrait' } as ViewPhotosHorizontalGridPhoto;
						})
				])
			);
		}
	}, [stills]);

	return (
		<ViewPhotosHorizontalGrid
			mediaType='tv'
			photos={[...photosDebounced]}
			dummyPhotos={[...dummyPhotos]}
			title='Photos'
			subtitle={`This list is showcasing some of the posters & backdrops that were used for ${
				name
					? ['Episode', number, `"${name}"`].join(' ')
					: `${formatMediaTypeLabel({
							type: 'single',
							mediaType: 'tv'
					  })} Episode`
			}`}
			emptyLabel={name ? `${name} photos` : 'Photos'}
			total={stills.length}
			isLoading={isFetching || isLoading}
			isError={isError}
			isSuccess={isSuccess}
			onFooterClick={() => onSetActiveTab({ index: getEpisodeTabIndex('photos') })}
		/>
	);
};

export default OverviewTabPhotos;
