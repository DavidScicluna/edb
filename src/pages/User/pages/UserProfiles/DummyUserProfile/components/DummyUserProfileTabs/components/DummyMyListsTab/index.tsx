import { FC } from 'react';

import {
	DummyTabListDummyTab,
	useTheme,
	Tabs,
	DummyTabList,
	TabPanels,
	Divider
} from '@davidscicluna/component-library';

import { VStack, Center } from '@chakra-ui/react';

import { compact, range } from 'lodash';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';

import DummyAllTab from './components/DummyMyListsTabAllTab';
import DummyHeadline from './components/DummyMyListsTabHeadline';
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
				<DummyHeadline />
			</Center>

			<Tabs width='100%' activeTab={0} color={color} colorMode={colorMode} size='lg'>
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
						{compact([
							<DummyAllTab key='DummyMyListsTab_DummyAllTab' />,

							...range(5).map((_dummy, index) => (
								<DummyListTab key={`DummyMyListsTab_DummyListTab_${index + 1}`} />
							))
						])}
					</TabPanels>
				</VStack>
			</Tabs>
		</VStack>
	);
};

export default DummyMyListsTab;
