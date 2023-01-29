import { FC } from 'react';

import { Tabs, DummyTabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import DummyMoviesTab from '../../../../../../../../Movies/components/VerticalDummyMovies';
import DummyPeopleTab from '../../../../../../../../People/components/VerticalDummyPeople';
import DummyTVShowsTab from '../../../../../../../../TVShows/components/VerticalDummyTVShows';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../../../../common/utils';
import { DummyTabIcon } from '../../../../../../../../../components';
import DummyCollectionsTab from '../DummyUserProfileTabsCollections';
import DummyCompaniesTab from '../DummyUserProfileTabsCompanies';

import DummyAllTab from './components/DummyAllTab';
import { DummyUserProfileTabsTabsProps } from './types';

const DummyUserProfileTabsTabs: FC<DummyUserProfileTabsTabsProps> = ({ mediaTypes }) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<Tabs width='100%' color={color} colorMode={colorMode} isDisabled size='lg'>
			<VStack width='100%' spacing={spacing}>
				<DummyTabList
					tabs={compact([
						{ label: 'All' },

						mediaTypes.some((mediaType) => mediaType === 'movie')
							? {
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
									renderLeft: ({ colorMode }) => (
										<DummyTabIcon
											colorMode={colorMode}
											icon={getMediaTypeIcon({ mediaType: 'movie' })}
										/>
									)
							  }
							: null,

						mediaTypes.some((mediaType) => mediaType === 'tv')
							? {
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
									renderLeft: ({ colorMode }) => (
										<DummyTabIcon
											colorMode={colorMode}
											icon={getMediaTypeIcon({ mediaType: 'tv' })}
										/>
									)
							  }
							: null,

						mediaTypes.some((mediaType) => mediaType === 'person')
							? {
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' }),
									renderLeft: ({ colorMode }) => (
										<DummyTabIcon
											colorMode={colorMode}
											icon={getMediaTypeIcon({ mediaType: 'person' })}
										/>
									)
							  }
							: null,

						mediaTypes.some((mediaType) => mediaType === 'collection')
							? {
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' }),
									renderLeft: ({ colorMode }) => (
										<DummyTabIcon
											colorMode={colorMode}
											icon={getMediaTypeIcon({ mediaType: 'collection' })}
										/>
									)
							  }
							: null,

						mediaTypes.some((mediaType) => mediaType === 'company')
							? {
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'company' }),
									renderLeft: ({ colorMode }) => (
										<DummyTabIcon
											colorMode={colorMode}
											icon={getMediaTypeIcon({ mediaType: 'company' })}
										/>
									)
							  }
							: null
					])}
				/>

				<TabPanels>
					<DummyAllTab mediaTypes={mediaTypes} />

					{mediaTypes.some((mediaType) => mediaType === 'movie') && <DummyMoviesTab />}

					{mediaTypes.some((mediaType) => mediaType === 'tv') && <DummyTVShowsTab />}

					{mediaTypes.some((mediaType) => mediaType === 'person') && <DummyPeopleTab />}

					{mediaTypes.some((mediaType) => mediaType === 'collection') && <DummyCollectionsTab />}

					{mediaTypes.some((mediaType) => mediaType === 'company') && <DummyCompaniesTab />}
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default DummyUserProfileTabsTabs;
