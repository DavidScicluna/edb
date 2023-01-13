import { FC } from 'react';

import {
	Headline,
	DummyAccordions,
	DummyAccordionsPanel,
	DummyAccordion,
	DummyAccordionHeader,
	Divider,
	Skeleton,
	Badge,
	BadgeLabel
} from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../common/hooks';

const DummySeasonsTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		// TODO: Maybe create a ViewTabStructure component and place headline in it with VStack
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={2}>
			<Headline
				width='100%'
				renderCaption={() => (
					// TODO: Replace with DummyBadge
					<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='rectangle'>
						<Badge color={color} colorMode={colorMode} size='xs'>
							<BadgeLabel>TV Show has a total of # Seasons</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Seasons</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>This Tab contains all the seasons that were released for the TV Show</Text>
					</Skeleton>
				)}
				py={spacing * 2}
			/>

			<DummyAccordions color='gray' colorMode={colorMode} accordions={range(5)} spacing={2}>
				<DummyAccordionsPanel>
					{({ accordions }) =>
						accordions.map((dummy) => (
							<DummyAccordion key={dummy} p={2}>
								<DummyAccordionHeader />
							</DummyAccordion>
						))
					}
				</DummyAccordionsPanel>
			</DummyAccordions>
		</VStack>
	);
};

export default DummySeasonsTab;
