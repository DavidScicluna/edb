import { FC, useState, useCallback, useEffect } from 'react';

import { useLocation } from 'react-router';

import { Tabs, DummyTabList, TabPanels, Skeleton } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { MediaType } from '../../../common/types';
import Page from '../../../containers/Page';
import PageHeader from '../../../containers/Page/components/PageHeader';
import PageBody from '../../../containers/Page/components/PageBody';
import { useUserTheme } from '../../../common/hooks';
import { formatMediaTypeLabel } from '../../../common/utils';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import { DummyDisplayMode } from '../../../components';
import TrendingDummyMovies from '../components/TrendingDummyMovies';
import TrendingDummyPeople from '../components/TrendingDummyPeople';
import TrendingDummyTV from '../components/TrendingDummyTV';
import { getActiveTabFromHash } from '../common/utils';

const mediaTypes: Exclude<MediaType, 'company' | 'collection'>[] = ['movie', 'tv', 'person'];

const DummyTrending: FC = () => {
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const { spacing } = useLayoutContext();

	const [activeTab, setActiveTab] = useState<number>(0);

	const handleSetActiveTab = useCallback((): void => {
		setActiveTab(getActiveTabFromHash({ location }) || 0);
	}, [location]);

	useEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => (
					<Skeleton isLoaded={false} variant='text'>
						<Text {...props}>Trending Media-Type</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton isLoaded={false} variant='text'>
						<Text {...props}>A list containing the most trending media-type this week.</Text>
					</Skeleton>
				)}
				direction='row'
				p={spacing}
			/>
			<PageBody px={spacing} pb={spacing}>
				<Tabs width='100%' activeTab={activeTab} color={color} colorMode={colorMode} size='xl'>
					<VStack width='100%' spacing={spacing}>
						<DummyTabList
							tabs={mediaTypes.map((mediaType) => {
								return { label: formatMediaTypeLabel({ type: 'multiple', mediaType }) };
							})}
							renderRight={() => <DummyDisplayMode />}
						/>

						<TabPanels>
							<TrendingDummyMovies />

							<TrendingDummyTV />

							<TrendingDummyPeople />
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default DummyTrending;
