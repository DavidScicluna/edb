import { FC } from 'react';

import { Headline, Divider, Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import DummyViewVideos from '../../../../components/ViewVideos/ViewVideosVerticalGrid/DummyViewVideosVerticalGrid';
import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

const DummyVideosTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					// TODO: Replace with DummyBadge
					<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='rectangle'>
						<Badge color={color} colorMode={colorMode} size='xs'>
							<BadgeLabel>Movie has a total of # Videos</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Videos</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>
							This Tab contains all the trailers, teasers & featurettes that were created for the movie
						</Text>
					</Skeleton>
				)}
				py={spacing * 2}
			/>

			<DummyViewVideos />
		</VStack>
	);
};

export default DummyVideosTab;
