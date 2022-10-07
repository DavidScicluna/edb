import { FC, useState, useCallback, lazy } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { TabsOnChangeProps, IconType, Tabs, TabList, TabPanels, Icon } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import Page from '../../../containers/Page';
import PageHeader from '../../../containers/Page/components/PageHeader';
import PageBody from '../../../containers/Page/components/PageBody';
import { useUserTheme } from '../../../common/hooks';
import { formatMediaType, formatMediaTypeLabel } from '../../../common/utils';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import { DisplayMode, Suspense } from '../../../components';
import TrendingDummyMovies from '../components/TrendingDummyMovies';
import TrendingDummyPeople from '../components/TrendingDummyPeople';
import TrendingDummyTV from '../components/TrendingDummyTV';
import { getActiveTabFromHash } from '../common/utils';

import { TrendingMediaType, TrendingMediaTypes } from './types';

const TrendingMovies = lazy(() => import('./components/TrendingMovies'));
const TrendingPeople = lazy(() => import('./components/TrendingPeople'));
const TrendingTV = lazy(() => import('./components/TrendingTV'));

const mediaTypes: TrendingMediaTypes = ['movie', 'tv', 'person'];

const Trending: FC = () => {
	const { color, colorMode } = useUserTheme();

	const location = useLocation();
	const navigate = useNavigate();

	const { spacing } = useLayoutContext();

	const [activeTab, setActiveTab] = useState<number>(0);

	const handleTitle = useCallback((): string => {
		const activeMediaType = formatMediaTypeLabel({
			type: 'multiple',
			mediaType: mediaTypes[activeTab]
		});

		return `Trending ${activeMediaType}`;
	}, [mediaTypes, activeTab]);

	const handleSubtitle = useCallback((): string => {
		const activeMediaType = formatMediaTypeLabel({
			type: 'multiple',
			mediaType: mediaTypes[activeTab]
		});

		return `A list containing the most trending ${activeMediaType} this week.`;
	}, [mediaTypes, activeTab]);

	const handleGetMediaTypeIcon = useCallback(
		(mediaType: TrendingMediaType): IconType => {
			switch (mediaType) {
				case 'movie':
					return 'theaters';
				case 'tv':
					return 'live_tv';
				case 'person':
					return 'people_alt';
			}
		},
		[mediaTypes, activeTab]
	);

	const handleTabChange = useCallback(
		({ index }: TabsOnChangeProps): void => {
			const activeMediaType = formatMediaType({ mediaType: mediaTypes[index] });

			navigate({ ...location, hash: activeMediaType });
		},
		[mediaTypes, location]
	);

	const handleSetActiveTab = useCallback((): void => {
		setActiveTab(getActiveTabFromHash({ location }) || 0);
	}, [location]);

	useEffectOnce(() => (location.hash.length > 0 ? handleSetActiveTab() : handleTabChange({ index: 0 })));

	useUpdateEffect(() => handleSetActiveTab(), [location.hash]);

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => <Text {...props}>{handleTitle()}</Text>}
				renderSubtitle={(props) => <Text {...props}>{handleSubtitle()}</Text>}
				actions={<DisplayMode />}
				direction='row'
				p={spacing}
			/>
			<PageBody>
				<Tabs
					width='100%'
					color={color}
					colorMode={colorMode}
					activeTab={activeTab}
					onChange={handleTabChange}
					px={spacing}
					pb={spacing}
					size='lg'
				>
					<VStack width='100%' spacing={spacing}>
						<TabList
							tabs={mediaTypes.map((mediaType, index) => {
								return {
									label: formatMediaTypeLabel({ type: 'multiple', mediaType }),
									renderLeft: ({ color, colorMode, height }) => (
										<Icon
											width={`${height}px`}
											height={`${height}px`}
											fontSize={`${height}px`}
											colorMode={colorMode}
											icon={handleGetMediaTypeIcon(mediaType)}
											category={activeTab === index ? 'filled' : 'outlined'}
											skeletonColor={color}
										/>
									)
								};
							})}
						/>

						<TabPanels>
							<Suspense fallback={<TrendingDummyMovies />}>
								<TrendingMovies />
							</Suspense>

							<Suspense fallback={<TrendingDummyTV />}>
								<TrendingTV />
							</Suspense>

							<Suspense fallback={<TrendingDummyPeople />}>
								<TrendingPeople />
							</Suspense>
						</TabPanels>
					</VStack>
				</Tabs>
			</PageBody>
		</Page>
	);
};

export default Trending;
