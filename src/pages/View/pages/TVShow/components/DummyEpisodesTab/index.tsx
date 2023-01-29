import { FC } from 'react';

import { Headline, Divider, Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../common/hooks';

import DummyEpisodesTabSeason from './components/DummyEpisodesTabSeason';

const DummyEpisodesTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		// TODO: Maybe create a ViewTabStructure component and place headline in it with VStack
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					// TODO: Replace with DummyBadge
					<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='rectangle'>
						<Badge color={color} colorMode={colorMode} size='xs'>
							<BadgeLabel>TV Show has a total of # Episodes</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Episodes</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>This Tab contains all the episode that were released for the TV Show</Text>
					</Skeleton>
				)}
				py={spacing * 2}
			/>

			<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
				{range(5).map((_dummy, index) => (
					<DummyEpisodesTabSeason key={index} />
				))}
			</VStack>
		</VStack>
	);
};

export default DummyEpisodesTab;
