import { FC, useState, useCallback, useEffect } from 'react';

import { useLocation } from 'react-router';

import { Tabs, DummyTabList, TabPanels, Skeleton } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import Page from '../../../containers/Page';
import PageHeader from '../../../containers/Page/components/PageHeader';
import PageBody from '../../../containers/Page/components/PageBody';
import { useUserTheme } from '../../../common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../common/utils';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import { DummyDisplayMode } from '../../../components';
import TrendingDummyMoviesTab from '../components/TrendingDummyMoviesTab';
import TrendingDummyPeopleTab from '../components/TrendingDummyPeopleTab';
import TrendingDummyTVTab from '../components/TrendingDummyTVTab';
import { getActiveTabFromHash } from '../common/utils';
import TrendingDummyAllTab from '../components/TrendingDummyAllTab';
import TrendingTabIcon from '../components/TrendingTabIcon';

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
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Trending Media-Type</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>A list containing the most trending media-type this week.</Text>
					</Skeleton>
				)}
				actions={activeTab !== 0 ? <DummyDisplayMode /> : undefined}
				direction='row'
				p={spacing}
			/>
			<PageBody px={spacing} pb={spacing}>
				<Tabs width='100%' activeTab={activeTab} color={color} colorMode={colorMode} size='xl'>
					<VStack width='100%' spacing={spacing}>
						<DummyTabList
							tabs={[
								{ label: 'All' },

								{
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
									renderLeft: (props) => (
										<Skeleton isLoaded={false} variant='rectangle'>
											<TrendingTabIcon
												{...props}
												icon={getMediaTypeIcon({ mediaType: 'movie' })}
											/>
										</Skeleton>
									)
								},

								{
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
									renderLeft: (props) => (
										<Skeleton isLoaded={false} variant='rectangle'>
											<TrendingTabIcon {...props} icon={getMediaTypeIcon({ mediaType: 'tv' })} />
										</Skeleton>
									)
								},

								{
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
									renderLeft: (props) => (
										<Skeleton isLoaded={false} variant='rectangle'>
											<TrendingTabIcon
												{...props}
												icon={getMediaTypeIcon({ mediaType: 'person' })}
											/>
										</Skeleton>
									)
								}
							]}
						/>

						<TabPanels>
							<TrendingDummyAllTab />

							<TrendingDummyMoviesTab />

							<TrendingDummyTVTab />

							<TrendingDummyPeopleTab />
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default DummyTrending;
