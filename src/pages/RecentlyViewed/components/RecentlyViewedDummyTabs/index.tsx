import { FC } from 'react';

import { Tabs, DummyTabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import DummyCollectionsTab from '../RecentlyViewedDummyCollections';
import DummyMoviesTab from '../RecentlyViewedDummyMovies';
import DummyPeopleTab from '../RecentlyViewedDummyPeople';
import DummyTVShowsTab from '../RecentlyViewedDummyTVShows';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../common/utils';
import { DummyTabIcon } from '../../../../components';
import { useUserTheme } from '../../../../common/hooks';
import { useLayoutContext } from '../../../../containers/Layout/common/hooks';

import DummyAllTab from './components/DummyAllTab';

const RecentlyViewedDummyTabs: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<Tabs width='100%' color={color} colorMode={colorMode} isDisabled size='xl'>
			<VStack width='100%' spacing={spacing}>
				<DummyTabList
					tabs={compact([
						{ label: 'All' },

						{
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
							renderLeft: ({ colorMode }) => (
								<DummyTabIcon colorMode={colorMode} icon={getMediaTypeIcon({ mediaType: 'movie' })} />
							)
						},

						{
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
							renderLeft: ({ colorMode }) => (
								<DummyTabIcon colorMode={colorMode} icon={getMediaTypeIcon({ mediaType: 'tv' })} />
							)
						},

						{
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
							renderLeft: ({ colorMode }) => (
								<DummyTabIcon colorMode={colorMode} icon={getMediaTypeIcon({ mediaType: 'person' })} />
							)
						},

						{
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' }),
							renderLeft: ({ colorMode }) => (
								<DummyTabIcon
									colorMode={colorMode}
									icon={getMediaTypeIcon({ mediaType: 'collection' })}
								/>
							)
						}
					])}
				/>

				<TabPanels>
					<DummyAllTab />

					<DummyMoviesTab />

					<DummyTVShowsTab />

					<DummyPeopleTab />

					<DummyCollectionsTab />
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default RecentlyViewedDummyTabs;
