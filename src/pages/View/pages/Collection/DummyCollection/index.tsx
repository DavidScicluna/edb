import { FC, useState } from 'react';

import { useLocation } from 'react-router';

import { useTheme, useDebounce, Tabs, TabList, TabPanels, Skeleton } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import collectionTabs from '../common/data/tabs';
import ViewDummyPoster from '../../../components/ViewDummyPoster';
import { useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import Page from '../../../../../containers/Page';
import PageHeader from '../../../../../containers/Page/components/PageHeader';
import PageBody from '../../../../../containers/Page/components/PageBody';
import DummyOverviewTab from '../components/DummyOverviewTab';
import DummyPartsTab from '../components/DummyPartsTab';
import DummyPhotosTab from '../components/DummyPhotosTab';
import CollectionsDummyActions from '../components/CollectionsDummyActions';
import CollectionsDummyInfo from '../components/CollectionsDummyInfo';

const DummyCollection: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isGuest, spacing } = useLayoutContext();

	const location = useLocation();

	// TODO: Go over all useDebounce and check that we are actually using the debounced value not the state!
	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const handleSetActiveTab = (): void => {
		const hash = location.hash.replaceAll('#', '');
		const index = collectionTabs.findIndex(({ path }) => path.hash === hash);

		setActiveTab(index >= 0 ? index : 0);
	};

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : undefined));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<Page>
			<PageHeader
				renderLeftPanel={!isSm ? () => <ViewDummyPoster /> : undefined}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Collection name</Text>
					</Skeleton>
				)}
				renderSubtitle={() => <CollectionsDummyInfo />}
				direction='row'
				spacing={spacing}
				p={spacing}
			/>
			{isSm ? <ViewDummyPoster isFullWidth p={spacing} /> : null}
			{!isGuest ? <CollectionsDummyActions p={spacing} /> : null}
			<PageBody px={spacing} pb={spacing}>
				<Tabs
					width='100%'
					height='100%'
					color={color}
					colorMode={colorMode}
					activeTab={activeTabDebounced}
					size='xl'
				>
					<VStack width='100%' height='100%' spacing={spacing}>
						<TabList
							// TODO: Go over all View pages and add error handling ... meaning show errors if query fails
							tabs={collectionTabs.map(({ label }) => {
								return { label };
							})}
						/>

						<TabPanels>
							<DummyOverviewTab />

							<DummyPartsTab />

							<DummyPhotosTab />
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default DummyCollection;
