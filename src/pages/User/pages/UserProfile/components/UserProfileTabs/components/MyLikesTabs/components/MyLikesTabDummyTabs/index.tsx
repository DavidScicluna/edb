import { FC } from 'react';

import { TabListTab, Tabs, DummyTabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import DummyMoviesTab from '../MyLikesTabDummyMovies';
import DummyPeopleTab from '../MyLikesTabDummyPeople';
import DummyTVShowsTab from '../MyLikesTabDummyTVShows';
import { useUserTheme } from '../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../../../../../common/utils';
import { MediaType } from '../../../../../../../../../../common/types';

import DummyTabIcon from './components/DummyTabIcon';
import DummyAllTab from './components/DummyAllTab';

const mediaTypes: MediaType[] = ['movie', 'tv', 'person', 'company', 'collection'];

const MyLikesTabDummyTabs: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<Tabs width='100%' color={color} colorMode={colorMode} size='xl'>
			<VStack width='100%' spacing={spacing}>
				<DummyTabList
					tabs={[
						{ label: 'All' },
						...(mediaTypes.map((mediaType) => {
							return {
								label: formatMediaTypeLabel({ type: 'multiple', mediaType }),
								renderLeft: (props) => (
									<DummyTabIcon {...props} icon={getMediaTypeIcon({ mediaType })} />
								)
							};
						}) as TabListTab[])
					]}
					// renderRight={() => <DummyDisplayMode />}
				/>

				<TabPanels>
					<DummyAllTab />

					<DummyMoviesTab />

					<DummyTVShowsTab />

					<DummyPeopleTab />
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default MyLikesTabDummyTabs;
