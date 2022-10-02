import { FC } from 'react';

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

const mediaTypes: Exclude<MediaType, 'company' | 'collection'>[] = ['movie', 'tv', 'person'];

const DummyTrending: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

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
				p={spacing}
			/>
			<PageBody>
				<Tabs width='100%' color={color} colorMode={colorMode} px={spacing} pb={spacing} size='xl'>
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
