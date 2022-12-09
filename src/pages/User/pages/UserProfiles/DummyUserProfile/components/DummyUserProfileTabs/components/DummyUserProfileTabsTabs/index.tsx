import { FC } from 'react';

import { TabListTab, Tabs, DummyTabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import DummyMoviesTab from '../../../../../../../../Movies/components/VerticalDummyMovies';
import DummyPeopleTab from '../../../../../../../../People/components/VerticalDummyPeople';
import DummyTVShowsTab from '../../../../../../../../TVShows/components/VerticalDummyTVShows';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../../../../common/utils';
import { DummyTabIcon } from '../../../../../../../../../components';

import DummyAllTab from './components/DummyAllTab';
import { DummyUserProfileTabsTabsProps } from './types';

const DummyUserProfileTabsTabs: FC<DummyUserProfileTabsTabsProps> = ({ mediaTypes }) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<Tabs width='100%' color={color} colorMode={colorMode} isDisabled size='lg'>
			<VStack width='100%' spacing={spacing}>
				<DummyTabList
					tabs={[
						{ label: 'All' },

						...(mediaTypes.map((mediaType) => {
							return {
								label: formatMediaTypeLabel({ type: 'multiple', mediaType }),
								renderLeft: ({ colorMode }) => (
									<DummyTabIcon colorMode={colorMode} icon={getMediaTypeIcon({ mediaType })} />
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

					{/* TODO: Add company & collection */}
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default DummyUserProfileTabsTabs;
