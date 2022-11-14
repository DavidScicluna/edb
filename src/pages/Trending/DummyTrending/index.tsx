import { FC, useState, useCallback, useEffect } from 'react';

import { useLocation } from 'react-router';

import { useDebounce, Tabs, DummyTabList, TabPanels, Skeleton } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import Page from '../../../containers/Page';
import PageHeader from '../../../containers/Page/components/PageHeader';
import PageBody from '../../../containers/Page/components/PageBody';
import { useUserTheme } from '../../../common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../common/utils';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import { DummyTabIcon } from '../../../components';
import TrendingDummyMoviesTab from '../components/TrendingDummyMoviesTab';
import TrendingDummyPeopleTab from '../components/TrendingDummyPeopleTab';
import TrendingDummyTVShowsTab from '../components/TrendingDummyTVShowsTab';
import { getActiveTabFromHash } from '../common/utils';
import TrendingDummyAllTab from '../components/TrendingDummyAllTab';

const DummyTrending: FC = () => {
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const { spacing } = useLayoutContext();

	const [activeTab, setActiveTab] = useState<number>(getActiveTabFromHash({ location }) || 0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const handleSetActiveTab = useCallback((): void => {
		setActiveTab(getActiveTabFromHash({ location }) || 0);
	}, [location]);

	useEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Trending</Text>
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
						<DummyTabList
							tabs={[
								{ label: 'All' },

								{
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
									renderLeft: (props) => (
										<DummyTabIcon {...props} icon={getMediaTypeIcon({ mediaType: 'movie' })} />
									)
								},

								{
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
									renderLeft: (props) => (
										<DummyTabIcon {...props} icon={getMediaTypeIcon({ mediaType: 'tv' })} />
									)
								},

								{
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
									renderLeft: (props) => (
										<DummyTabIcon {...props} icon={getMediaTypeIcon({ mediaType: 'person' })} />
									)
								}
							]}
						/>

						<TabPanels>
							<TrendingDummyAllTab />

							<TrendingDummyMoviesTab />

							<TrendingDummyTVShowsTab />

							<TrendingDummyPeopleTab />
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default DummyTrending;
