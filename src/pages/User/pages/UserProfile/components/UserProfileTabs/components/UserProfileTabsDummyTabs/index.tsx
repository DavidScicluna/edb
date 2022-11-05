import { FC } from 'react';

import { TabListTab, Tabs, DummyTabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import DummyMoviesTab from '../../../../../../../Movies/components/VerticalDummyMovies';
import DummyPeopleTab from '../../../../../../../People/components/VerticalDummyPeople';
import DummyTVShowsTab from '../../../../../../../TVShows/components/VerticalDummyTVShows';
import { useUserTheme } from '../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../../../common/utils';
import { DummyTabIcon } from '../../../../../../../../components';

import DummyAllTab from './components/DummyAllTab';
import { UserProfileTabsDummyTabsProps } from './types';

const UserProfileTabsDummyTabs: FC<UserProfileTabsDummyTabsProps> = ({ mediaTypes }) => {
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
				/>

				<TabPanels>
					<DummyAllTab mediaTypes={mediaTypes} />

					{mediaTypes.some((mediaType) => mediaType === 'movie') && <DummyMoviesTab />}

					{mediaTypes.some((mediaType) => mediaType === 'tv') && <DummyTVShowsTab />}

					{mediaTypes.some((mediaType) => mediaType === 'person') && <DummyPeopleTab />}
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default UserProfileTabsDummyTabs;
