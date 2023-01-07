import { FC } from 'react';

import { Headline, Skeleton, Divider, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useConst, VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import DummyViewPhotos from '../../../../components/ViewPhotos/DummyViewPhotos';
import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { ViewPhotosDummyPhoto, ViewPhotosDummyPhotos } from '../../../../components/ViewPhotos/common/types';

const DummyPhotosTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const dummyPhotos = useConst<ViewPhotosDummyPhotos>(
		range(20).map(() => {
			return { orientation: 'portrait' } as ViewPhotosDummyPhoto;
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
							<BadgeLabel>Person has a total of # Photos</BadgeLabel>
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
						<Text {...props}>
							This Tab contains all the photos that the person has taken throughout their career.
						</Text>
					</Skeleton>
				)}
				py={spacing * 2}
			/>

			<DummyViewPhotos dummyPhotos={dummyPhotos} />
		</VStack>
	);
};

export default DummyPhotosTab;
