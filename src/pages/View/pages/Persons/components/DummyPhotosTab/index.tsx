import { FC } from 'react';

import { Headline, Skeleton, Divider, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import Masonry from '../PersonsMasonry';
import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

import DummyPhoto from './components/DummyPhotosTabPhoto';

const DummyPhotosTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					// TODO: Replace with DummyBadge
					<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='text'>
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

			<VStack width='100%'>
				<Masonry>
					{range(12).map((_dummy, index) => (
						<DummyPhoto key={index} />
					))}
				</Masonry>
			</VStack>
		</VStack>
	);
};

export default DummyPhotosTab;
