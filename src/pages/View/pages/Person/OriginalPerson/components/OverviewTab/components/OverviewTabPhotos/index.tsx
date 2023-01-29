import { FC, useState, useEffect } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { range, shuffle } from 'lodash';

import { usePersonContext } from '../../../../common/hooks';
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
import { getPersonTabIndex } from '../../../../../common/utils';

const OverviewTabPhotos: FC = () => {
	const { personQuery, imagesQuery, onSetActiveTab } = usePersonContext();
	const { data: person } = personQuery || {};
	const { name, gender } = person || {};
	const { data: images, isFetching, isLoading, isError, isSuccess } = imagesQuery || {};
	const { profiles = [] } = images || {};

	const [photos, setPhotos] = useState<ViewPhotosHorizontalGridPhotos>([]);
	const photosDebounced = useDebounce<ViewPhotosHorizontalGridPhotos>(photos, 'slow');

	const dummyPhotos = useConst<ViewPhotosHorizontalGridDummyPhotos>(
		range(10).map(() => {
			return { orientation: 'portrait' } as ViewPhotosHorizontalGridDummyPhoto;
		})
	);

	useEffect(() => {
		if (photosDebounced.length === 0 && profiles.length > 0) {
			setPhotos(
				shuffle(
					profiles
						.filter((_profile, index) => index < 10)
						.map((profile) => {
							return { image: profile, orientation: 'portrait' } as ViewPhotosHorizontalGridPhoto;
						})
				)
			);
		}
	}, [profiles]);

	return (
		<ViewPhotosHorizontalGrid
			mediaType='person'
			photos={[...photosDebounced]}
			dummyPhotos={[...dummyPhotos]}
			title='Photos'
			subtitle={`This list is showcasing some of the photos that ${
				name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })}`
			} has taken throughout ${gender === 1 ? 'her' : gender === 2 ? 'his' : 'their'} career`}
			emptyLabel={name ? `${name} photos` : 'Photos'}
			total={profiles.length}
			isLoading={isFetching || isLoading}
			isError={isError}
			isSuccess={isSuccess}
			onFooterClick={() => onSetActiveTab({ index: getPersonTabIndex('photos') })}
		/>
	);
};

export default OverviewTabPhotos;
