import { FC, useState } from 'react';

import { useLocation } from 'react-router';

import { useDebounce, Tabs, DummyTabList, TabPanels, Skeleton, Icon } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';

import DummyMyLikesTab from './components/DummyMyLikesTab';
import DummyOverviewTab from './components/DummyOverviewTab';
import DummyMyListsTab from './components/DummyMyListsTab';
import { DummyUserProfileTabs as DummyUserProfileTabsType } from './types';

const tabs: DummyUserProfileTabsType = [
	{
		path: { hash: 'overview' },
		label: 'Overview'
	},
	{
		path: { hash: 'mylikes' },
		label: 'My Likes',
		renderIcon: ({ color, colorMode, height = 0, isActive }) => (
			<Skeleton colorMode={colorMode} isLoaded={false} variant='rectangle'>
				<Icon
					width={`${height}px`}
					height={`${height}px`}
					fontSize={`${height}px`}
					colorMode={colorMode}
					icon={isActive ? 'favorite' : 'favorite_border'}
					skeletonColor={color}
				/>
			</Skeleton>
		)
	},
	{
		path: { hash: 'mylists' },
		label: 'My Lists',
		renderIcon: ({ color, colorMode, height = 0, isActive }) => (
			<Skeleton colorMode={colorMode} isLoaded={false} variant='rectangle'>
				<Icon
					width={`${height}px`}
					height={`${height}px`}
					fontSize={`${height}px`}
					colorMode={colorMode}
					icon={isActive ? 'bookmark' : 'bookmark_border'}
					skeletonColor={color}
				/>
			</Skeleton>
		)
	}
];

const DummyUserProfileTabs: FC = () => {
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const { spacing } = useLayoutContext();

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = tabs.findIndex((tab) => tab.path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<Tabs width='100%' activeTab={activeTabDebounced} color={color} colorMode={colorMode} isDisabled size='xl'>
			<VStack width='100%' spacing={spacing}>
				<DummyTabList
					tabs={tabs.map((tab, index) => {
						return {
							label: tab.label,
							renderLeft: (props) => {
								return tab.renderIcon
									? tab.renderIcon({ ...props, isActive: activeTabDebounced === index })
									: undefined;
							}
						};
					})}
				/>

				<TabPanels>
					<DummyOverviewTab />

					<DummyMyLikesTab />

					<DummyMyListsTab />
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default DummyUserProfileTabs;
