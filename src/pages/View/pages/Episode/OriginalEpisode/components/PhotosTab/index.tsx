import { FC, useState, useEffect } from 'react';

import { useDebounce, Headline, Divider } from '@davidscicluna/component-library';

import { useConst, VStack, Center, Text } from '@chakra-ui/react';

import { range, shuffle } from 'lodash';

import { TotalBadge } from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../../common/hooks';
import { useEpisodeContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { ViewPhotosDummyPhotos, ViewPhotosDummyPhoto } from '../../../../../components/ViewPhotos/common/types';
import { ViewPhotosPhotos, ViewPhotosPhoto } from '../../../../../components/ViewPhotos/OriginalViewPhotos/types';
import { getPhotoHeight } from '../../../../../components/ViewPhotos/common/utils';
import ViewMasonry from '../../../../../components/ViewPhotos/components/ViewPhotosMasonry';
import EpisodeError from '../EpisodeError';
import EpisodeEmpty from '../EpisodeEmpty';
import DummyPhoto from '../../../../../components/ViewPhotos/components/ViewPhotosDummyPhoto';

import Photo from './components/PhotosTabPhoto';

const PhotosTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { episodeQuery, imagesQuery } = useEpisodeContext();

	const { data: episode } = episodeQuery || {};
	const { name, episode_number: number } = episode || {};

	const { data: images, isFetching, isLoading, isError, isSuccess, refetch } = imagesQuery || {};
	const { stills = [] } = images || {};

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
		if (photosDebounced.length === 0 && stills.length > 0) {
			setPhotos(
				shuffle([
					...stills.map((poster) => {
						return {
							height: getPhotoHeight({ orientation: 'portrait' }),
							image: poster,
							orientation: 'portrait'
						} as ViewPhotosPhoto;
					})
				])
			);
		}
	}, [stills]);

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							name
								? ['Episode', number, `"${name}"`].join(' ')
								: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Episode`
						} has a total of`}
						suffix={`Photo${photosDebounced.length === 1 ? '' : 's'}`}
						total={photosDebounced.length || 0}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Photos</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the photos that were used for ${
							name
								? ['Episode', number, `"${name}"`].join(' ')
								: `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Episode`
						}`}
					</Text>
				)}
				py={spacing * 2}
			/>

			<Center width='100%'>
				{!(isFetching || isLoading) && isError ? (
					<EpisodeError
						label={
							name
								? ['Episode', number, `"${name}"`, 'Photos'].join(' ')
								: `${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'tv'
								  })} Episode Photos`
						}
						refetch={refetch}
					/>
				) : !(isFetching || isLoading) && isSuccess && photos.length === 0 ? (
					<EpisodeEmpty
						label={
							name
								? ['Episode', number, `"${name}"`, 'Photos'].join(' ')
								: `${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'tv'
								  })} Episode Photos`
						}
					/>
				) : !(isFetching || isLoading) && isSuccess && photos.length > 0 ? (
					<ViewMasonry
						items={photos.map((photo) => {
							return { ...photo, number, name };
						})}
						render={Photo}
					/>
				) : (
					<ViewMasonry items={dummyPhotos} render={DummyPhoto} />
				)}
			</Center>
		</VStack>
	);
};

export default PhotosTab;
