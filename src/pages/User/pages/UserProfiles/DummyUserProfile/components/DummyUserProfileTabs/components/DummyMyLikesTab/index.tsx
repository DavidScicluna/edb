import { FC } from 'react';

import { useTheme, Headline, Divider, Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';

import DummyTabs from '../DummyUserProfileTabsTabs';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';

const DummyMyLikesTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<VStack
			width='100%'
			divider={<Divider colorMode={colorMode} mt={`${theme.space[spacing]} !important`} />}
			spacing={0}
		>
			<Center width='100%' py={spacing * 2}>
				<Headline
					width='100%'
					renderCaption={() => (
						// TODO: Replace with DummyBadge
						<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='rectangle'>
							<Badge color={color} colorMode={colorMode} size='xs'>
								<BadgeLabel>Total of # likes</BadgeLabel>
							</Badge>
						</Skeleton>
					)}
					renderTitle={(props) => (
						<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
							<Text {...props}>My Likes</Text>
						</Skeleton>
					)}
					renderSubtitle={(props) => (
						<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
							<Text {...props}>
								This Tab contains all likes that have been added to the likes list and all likes are
								separated into tabs depending on the media type.
							</Text>
						</Skeleton>
					)}
				/>
			</Center>

			<DummyTabs mediaTypes={['movie', 'tv', 'person', 'company', 'collection']} />
		</VStack>
	);
};

export default DummyMyLikesTab;
