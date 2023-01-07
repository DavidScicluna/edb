import { FC } from 'react';

import {
	DummyTabListDummyTab,
	useTheme,
	Headline,
	Tabs,
	DummyTabList,
	TabPanels,
	Skeleton,
	Divider,
	Badge,
	BadgeLabel
} from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';

import DummyAllTab from './components/DummyMyListsTabAllTab';
import DummyListTab from './components/DummyMyListsTabListTab';

const DummyMyListsTab: FC = () => {
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
								<BadgeLabel>Total of # lists</BadgeLabel>
							</Badge>
						</Skeleton>
					)}
					renderTitle={(props) => (
						<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
							<Text {...props}>My Lists</Text>
						</Skeleton>
					)}
					renderSubtitle={(props) => (
						<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
							<Text {...props}>
								This Tab contains all the lists that have been created and all the bookmarks in each
								list.
							</Text>
						</Skeleton>
					)}
				/>
			</Center>

			<Tabs width='100%' color={color} colorMode={colorMode} isDisabled size='lg'>
				<VStack width='100%' spacing={spacing}>
					<DummyTabList
						tabs={[
							{ label: 'All' },

							...range(5).map((_dummy, index) => {
								return { label: `List #${index + 1}` } as DummyTabListDummyTab;
							})
						]}
					/>

					<TabPanels>
						<DummyAllTab />

						{range(5).map((_dummy, index) => (
							<DummyListTab key={index} />
						))}
					</TabPanels>
				</VStack>
			</Tabs>
		</VStack>
	);
};

export default DummyMyListsTab;
