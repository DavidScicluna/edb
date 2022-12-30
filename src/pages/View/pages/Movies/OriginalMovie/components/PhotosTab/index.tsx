import { FC, useState, useEffect } from 'react';

import { useDebounce, Headline, Divider } from '@davidscicluna/component-library';

import { useConst, VStack, Text } from '@chakra-ui/react';

import { range, sample, shuffle } from 'lodash';

import { TotalBadge } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../../common/hooks';
import { useMovieContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewPhotos from '../../../../../components/ViewPhotos/OriginalViewPhotos';
import {
	ViewPhotosOrientation,
	ViewPhotosDummyPhotos,
	ViewPhotosDummyPhoto
} from '../../../../../components/ViewPhotos/common/types';
import { ViewPhotosPhotos, ViewPhotosPhoto } from '../../../../../components/ViewPhotos/OriginalViewPhotos/types';
import { getPhotoHeight } from '../../../../../components/ViewPhotos/common/utils';

const PhotosTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { movieQuery, imagesQuery } = useMovieContext();

	const { data: movie } = movieQuery || {};
	const { title } = movie || {};

	const { data: images, isFetching, isLoading, isError, isSuccess, error, refetch } = imagesQuery || {};
	const { posters = [], backdrops = [] } = images || {};

	const [photos, setPhotos] = useState<ViewPhotosPhotos>([]);
	const photosDebounced = useDebounce<ViewPhotosPhotos>(photos, 'slow');

	const dummyPhotos = useConst<ViewPhotosDummyPhotos>(
		range(20).map(() => {
			const orientation: ViewPhotosOrientation = sample(['portrait', 'landscape']) || 'portrait';
			return { height: getPhotoHeight({ orientation }), orientation } as ViewPhotosDummyPhoto;
		})
	);

	useEffect(() => {
		if (photosDebounced.length === 0 && posters.length + backdrops.length > 0) {
			setPhotos(
				shuffle([
					...posters.map((poster) => {
						return {
							height: getPhotoHeight({ orientation: 'portrait' }),
							image: poster,
							orientation: 'portrait'
						} as ViewPhotosPhoto;
					}),
					...backdrops.map((backdrop) => {
						return {
							height: getPhotoHeight({ orientation: 'landscape' }),
							image: backdrop,
							orientation: 'landscape'
						} as ViewPhotosPhoto;
					})
				])
			);
		}
	}, [posters, backdrops]);

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							title ? title : formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })
						} has a total of`}
						suffix={`Photo${photosDebounced.length === 1 ? '' : 's'}`}
						total={photosDebounced.length || 0}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Photos</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the photos & backdrops that were used for ${
							title ? title : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}`
						}`}
					</Text>
				)}
				py={spacing * 2}
			/>

			<ViewPhotos
				mediaType='movie'
				photos={photosDebounced}
				dummyPhotos={dummyPhotos}
				name={title}
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