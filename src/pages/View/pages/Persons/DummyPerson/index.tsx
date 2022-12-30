import { FC, useState } from 'react';

import { useLocation } from 'react-router';

import { useTheme, useDebounce, Tabs, DummyTabList, TabPanels, Skeleton } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import Page from '../../../../../containers/Page';
import PageBody from '../../../../../containers/Page/components/PageBody';
import PageHeader from '../../../../../containers/Page/components/PageHeader';
import { useUserTheme } from '../../../../../common/hooks';
import ViewDummyAvatar from '../../../components/ViewDummyPoster';
import ViewDummySocials from '../../../components/ViewDummySocials';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import DummyCreditsTab from '../components/DummyCreditsTab';
import PersonsDummyInfo from '../components/PersonsDummyInfo';
import PersonsDummyActions from '../components/PersonsDummyActions';

import { PersonTabs } from './types';

export const tabs: PersonTabs = [
	{ path: { hash: 'overview' }, label: 'Overview' },
	{ path: { hash: 'credits' }, label: 'Credits' },
	{ path: { hash: 'photos' }, label: 'Photos' }
];

const DummyPerson: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const location = useLocation();

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
				renderLeftPanel={() => <ViewDummyAvatar />}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Person Name</Text>
					</Skeleton>
				)}
				renderSubtitle={() => <PersonsDummyInfo />}
				direction='row'
				spacing={spacing}
				p={spacing}
			/>
			<PersonsDummyActions p={spacing} />
			<PageBody px={spacing} pb={spacing}>
				<Tabs width='100%' color={color} colorMode={colorMode} activeTab={activeTabDebounced} size='xl'>
					<VStack width='100%' spacing={spacing}>
						<DummyTabList
							tabs={tabs.map(({ label }) => {
								return { label };
							})}
							renderRight={!isSm ? () => <ViewDummySocials /> : undefined}
						/>

						<TabPanels>
							<DummyOverviewTab />

							<DummyCreditsTab />

							<DummyPhotosTab />
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default DummyPerson;
