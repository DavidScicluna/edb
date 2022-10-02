import { FC, useState, useCallback, lazy } from 'react';

import { Tabs, TabList, TabPanels } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { MediaType } from '../../../common/types';
import Page from '../../../containers/Page';
import PageHeader from '../../../containers/Page/components/PageHeader';
import PageBody from '../../../containers/Page/components/PageBody';
import { useUserTheme } from '../../../common/hooks';
import { formatMediaTypeLabel } from '../../../common/utils';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import { DisplayMode, Suspense } from '../../../components';
import TrendingDummyMovies from '../components/TrendingDummyMovies';
import TrendingDummyPeople from '../components/TrendingDummyPeople';
import TrendingDummyTV from '../components/TrendingDummyTV';

const TrendingMovies = lazy(() => import('./components/TrendingMovies'));
const TrendingPeople = lazy(() => import('./components/TrendingPeople'));
const TrendingTV = lazy(() => import('./components/TrendingTV'));

const mediaTypes: Exclude<MediaType, 'company' | 'collection'>[] = ['movie', 'tv', 'person'];

const Trending: FC = () => {
	const { color, colorMode } = useUserTheme();

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

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => <Text {...props}>{handleTitle()}</Text>}
				renderSubtitle={(props) => <Text {...props}>{handleSubtitle()}</Text>}
				p={spacing}
			/>
			<PageBody>
				<Tabs
					width='100%'
					color={color}
					colorMode={colorMode}
					activeTab={activeTab}
					onChange={({ index }) => setActiveTab(index)}
					px={spacing}
					pb={spacing}
					size='xl'
				>
					<VStack width='100%' spacing={spacing}>
						<TabList
							tabs={mediaTypes.map((mediaType) => {
								return { label: formatMediaTypeLabel({ type: 'multiple', mediaType }) };
							})}
							renderRight={() => <DisplayMode />}
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
