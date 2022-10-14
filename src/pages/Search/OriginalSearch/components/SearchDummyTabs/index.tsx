import { FC } from 'react';

import { Tabs, DummyTabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../common/utils';
import { SearchMediaTypes } from '../../types';
import SearchDummyMoviesTab from '../SearchDummyMovies';
import SearchDummyPeopleTab from '../SearchDummyPeople';
import SearchDummyTVShowsTab from '../SearchDummyTVShows';

import DummyTabIcon from './components/DummyTabIcon';
import DummyAllTab from './components/DummyAllTab';

const mediaTypes: SearchMediaTypes = ['movie', 'tv', 'person', 'company', 'collection'];

const SearchDummyTabs: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<Tabs width='100%' color={color} colorMode={colorMode} size='xl'>
			<VStack width='100%' spacing={spacing}>
				<DummyTabList
					tabs={mediaTypes.map((mediaType) => {
						return {
							label: formatMediaTypeLabel({ type: 'multiple', mediaType }),
							renderLeft: (props) => <DummyTabIcon {...props} icon={getMediaTypeIcon({ mediaType })} />
						};
					})}
					// renderRight={() => <DummyDisplayMode />}
				/>

				<TabPanels>
					<DummyAllTab />

					<SearchDummyMoviesTab />

					<SearchDummyTVShowsTab />

					<SearchDummyPeopleTab />
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default SearchDummyTabs;
