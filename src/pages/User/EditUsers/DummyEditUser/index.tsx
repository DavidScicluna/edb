import { FC, useState } from 'react';

import { useLocation } from 'react-router';

import { useDebounce, Tabs, DummyTabList, TabPanels, Skeleton } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import DummyPasswordTab from '../components/EditUsersDummyPasswordTab';
import DummyDetailsTab from '../components/EditUsersDummyDetailsTab';
import DummyGenresTab from '../components/EditUsersDummyGenresTab';
import DummyAssetsTab from '../components/EditUsersDummyAssetsTab';
import DummyCustomizationTab from '../components/EditUsersDummyCustomizationTab';
import tabs from '../common/data/tabs';
import Page from '../../../../containers/Page';
import PageHeader from '../../../../containers/Page/components/PageHeader';
import PageBody from '../../../../containers/Page/components/PageBody';
import { useUserTheme } from '../../../../common/hooks';
import { useLayoutContext } from '../../../../containers/Layout/common/hooks';

const DummyEditUser: FC = () => {
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
		<Page>
			<PageHeader
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Edit Profile</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>A list containing the most trending media-type this week.</Text>
					</Skeleton>
				)}
				direction='row'
				spacing={spacing}
				px={spacing}
				py={spacing * 2}
			/>
			<PageBody px={spacing} pb={spacing}>
				<Tabs
					width='100%'
					activeTab={activeTabDebounced}
					color={color}
					colorMode={colorMode}
					isDisabled
					size='xl'
				>
					<VStack width='100%' spacing={spacing}>
						<DummyTabList tabs={tabs} />

						<TabPanels>
							<DummyDetailsTab />

							<DummyPasswordTab />

							<DummyGenresTab />

							<DummyCustomizationTab />

							<DummyAssetsTab />
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default DummyEditUser;
