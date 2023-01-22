import { FC } from 'react';

import { Headline, Divider, Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useConst, VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import DummyPhoto from '../../../../components/ViewPhotos/components/ViewPhotosDummyPhoto';
import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { ViewPhotosDummyPhoto, ViewPhotosDummyPhotos } from '../../../../components/ViewPhotos/common/types';
import { getPhotoHeight } from '../../../../components/ViewPhotos/common/utils';
import ViewPhotosMasonry from '../../../../components/ViewPhotos/components/ViewPhotosMasonry';

const DummyPhotosTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const dummyPhotos = useConst<ViewPhotosDummyPhotos>(
		range(20).map(() => {
			return {
				height: getPhotoHeight({ orientation: 'portrait' }),
				orientation: 'portrait'
			} as ViewPhotosDummyPhoto;
		})
	);

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					// TODO: Replace with DummyBadge
					<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='rectangle'>
						<Badge color={color} colorMode={colorMode} size='xs'>
							<BadgeLabel>TV Show Episode has a total of # Photos</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Photos</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>This Tab contains all the photos that were used for the TV Show Episode</Text>
					</Skeleton>
				)}
				py={spacing * 2}
			/>

			<ViewPhotosMasonry items={dummyPhotos} render={DummyPhoto} />
		</VStack>
	);
};

export default DummyPhotosTab;
