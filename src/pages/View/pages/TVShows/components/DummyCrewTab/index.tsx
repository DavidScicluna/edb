import { FC } from 'react';

import { useTheme, Headline, Divider, Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import DummyViewCrew from '../../../../components/ViewCrew/DummyViewCrew';

const DummyCrewTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<VStack
			width='100%'
			divider={
				<Divider
					colorMode={colorMode}
					mt={`${theme.space[spacing]} !important`}
					mb={`${theme.space[2]} !important`}
				/>
			}
			spacing={0}
		>
			<Headline
				width='100%'
				renderCaption={() => (
					// TODO: Replace with DummyBadge
					<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='rectangle'>
						<Badge color={color} colorMode={colorMode} size='xs'>
							<BadgeLabel>TV Show has a total of # Series Crew</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Series Crew</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>
							This Tab contains all the People that were involved in the making of the TV Show
						</Text>
					</Skeleton>
				)}
				py={spacing * 2}
			/>

			<DummyViewCrew />
		</VStack>
	);
};

export default DummyCrewTab;
