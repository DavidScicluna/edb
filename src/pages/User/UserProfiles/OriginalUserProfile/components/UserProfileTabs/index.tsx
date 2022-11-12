import { FC, useState, lazy } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { TabsOnChangeProps, useDebounce, Tabs, TabList, TabPanels, Icon } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { Suspense } from '../../../../../../components';
import DummyMyLikesTab from '../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyMyLikesTab';
import DummyOverviewTab from '../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyOverviewTab';
import DummyMyListsTab from '../../../DummyUserProfile/components/DummyUserProfileTabs/components/DummyMyListsTab';

import { UserProfileTabs as UserProfileTabsType } from './types';

const OverviewTab = lazy(() => import('./components/OverviewTab'));
const MyLikesTab = lazy(() => import('./components/MyLikesTab'));
const MyListsTab = lazy(() => import('./components/MyListsTab'));

const tabs: UserProfileTabsType = [
	{
		path: { hash: 'overview' },
		label: 'Overview'
	},
	{
		path: { hash: 'mylikes' },
		label: 'My Likes',
		renderIcon: ({ color, colorMode, height = 0, isActive }) => (
			<Icon
				width={`${height}px`}
				height={`${height}px`}
				fontSize={`${height}px`}
				colorMode={colorMode}
				icon={isActive ? 'favorite' : 'favorite_border'}
				skeletonColor={color}
			/>
		)
	},
	{
		path: { hash: 'mylists' },
		label: 'My Lists',
		renderIcon: ({ color, colorMode, height = 0, isActive }) => (
			<Icon
				width={`${height}px`}
				height={`${height}px`}
				fontSize={`${height}px`}
				colorMode={colorMode}
				icon={isActive ? 'bookmark' : 'bookmark_border'}
				skeletonColor={color}
			/>
		)
	}
];

const UserProfileTabs: FC = () => {
	const { color, colorMode } = useUserTheme();

	const location = useLocation();
	const navigate = useNavigate();

	const { spacing } = useLayoutContext();

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const handleTabChange = ({ index }: TabsOnChangeProps): void => {
		const tab = tabs.find((_tab, i) => index === i);

		if (tab && tab.path) {
			navigate({ ...location, ...tab.path });
		}
	};

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = tabs.findIndex((tab) => tab.path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<Tabs
			width='100%'
			color={color}
			colorMode={colorMode}
			activeTab={activeTabDebounced}
			onChange={handleTabChange}
			size='xl'
		>
			<VStack width='100%' spacing={spacing}>
				<TabList
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
					<Suspense fallback={<DummyOverviewTab />}>
						<OverviewTab onTabChange={handleTabChange} />
					</Suspense>

					<Suspense fallback={<DummyMyLikesTab />}>
						<MyLikesTab />
					</Suspense>

					<Suspense fallback={<DummyMyListsTab />}>
						<MyListsTab />
					</Suspense>
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default UserProfileTabs;
