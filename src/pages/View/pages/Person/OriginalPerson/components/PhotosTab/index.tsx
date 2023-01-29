import { FC, useState, useEffect } from 'react';

import { useDebounce, Headline, Divider } from '@davidscicluna/component-library';

import { useConst, VStack, Text } from '@chakra-ui/react';

import { range, shuffle } from 'lodash';

import { TotalBadge } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../../common/hooks';
import { usePersonContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewPhotos from '../../../../../components/ViewPhotos/OriginalViewPhotos';
import { ViewPhotosDummyPhotos, ViewPhotosDummyPhoto } from '../../../../../components/ViewPhotos/common/types';
import { ViewPhotosPhotos, ViewPhotosPhoto } from '../../../../../components/ViewPhotos/OriginalViewPhotos/types';
import { getPhotoHeight } from '../../../../../components/ViewPhotos/common/utils';

const PhotosTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { personQuery, imagesQuery } = usePersonContext();

	const { data: person } = personQuery || {};
	const { name, gender } = person || {};

	const { data: images, isFetching, isLoading, isError, isSuccess, error, refetch } = imagesQuery || {};
	const { profiles = [] } = images || {};

	const [photos, setPhotos] = useState<ViewPhotosPhotos>([]);
	const photosDebounced = useDebounce<ViewPhotosPhotos>(photos, 'slow');

	const dummyPhotos = useConst<ViewPhotosDummyPhotos>(
		range(20).map(() => {
			return {
				height: getPhotoHeight({ orientation: 'portrait' }),
				orientation: 'portrait'
			} as ViewPhotosDummyPhoto;
		})
	);

	useEffect(() => {
		if (photosDebounced.length === 0 && profiles.length > 0) {
			setPhotos(
				shuffle(
					profiles.map((profile) => {
						return {
							height: getPhotoHeight({ orientation: 'portrait' }),
							image: profile,
							orientation: 'portrait'
						} as ViewPhotosPhoto;
					})
				)
			);
		}
	}, [profiles]);

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'person' })
						} has a total of`}
						suffix={`Photo${photosDebounced.length === 1 ? '' : 's'}`}
						total={photosDebounced.length || 0}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Photos</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the photos that ${
							name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })}`
						} has taken throughout ${gender === 1 ? 'her' : gender === 2 ? 'his' : 'their'} career.`}
					</Text>
				)}
				py={spacing * 2}
			/>

			<ViewPhotos
				mediaType='person'
				photos={photosDebounced}
				dummyPhotos={dummyPhotos}
				name={name}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
				isSuccess={isSuccess}
				error={error}
				refetch={refetch}
			/>
		</VStack>
	);
};

export default PhotosTab;
