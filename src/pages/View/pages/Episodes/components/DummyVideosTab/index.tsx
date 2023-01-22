import { FC } from 'react';

import { Headline, Divider, Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { VerticalGrid } from '../../../../../../components';
import DummyVideo from '../../../../components/ViewVideos/components/ViewVideosDummyVideo';

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
							<BadgeLabel>TV Show Episode has a total of # Videos</BadgeLabel>
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
							This Tab contains all the trailers, teasers & featurettes that were created for the TV Show
							Episode
						</Text>
					</Skeleton>
				)}
				py={spacing * 2}
			/>

			<VerticalGrid displayMode='grid'>
				{() => range(5).map((_dummy, index) => <DummyVideo key={index} />)}
			</VerticalGrid>
		</VStack>
	);
};

export default DummyVideosTab;
