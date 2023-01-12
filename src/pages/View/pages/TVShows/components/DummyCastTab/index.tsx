import { FC } from 'react';

import { Headline, Divider, Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import DummyViewCast from '../../../../components/ViewCast/DummyViewCast';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../common/hooks';

const DummyCastTab: FC = () => {
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
							<BadgeLabel>TV Show has a total of # Series Cast Members</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Series Cast</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>This Tab contains all the People that made an appearance in the TV Show</Text>
					</Skeleton>
				)}
				py={spacing * 2}
			/>

			<DummyViewCast mediaType='tv' />
		</VStack>
	);
};

export default DummyCastTab;
