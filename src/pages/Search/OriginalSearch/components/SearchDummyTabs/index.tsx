import { FC } from 'react';

import { Tabs, DummyTabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../common/utils';
import SearchDummyCollections from '../SearchDummyCollections';
import SearchDummyCompanies from '../SearchDummyCompanies';
import SearchDummyMoviesTab from '../SearchDummyMovies';
import SearchDummyPeopleTab from '../SearchDummyPeople';
import SearchDummyTVShowsTab from '../SearchDummyTVShows';
import { MediaType } from '../../../../../common/types';
import { DummyTabIcon } from '../../../../../components';

import DummyAllTab from './components/DummyAllTab';

const mediaTypes: MediaType[] = ['movie', 'tv', 'person', 'company', 'collection'];

const SearchDummyTabs: FC = () => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<Tabs width='100%' color={color} colorMode={colorMode} isDisabled size='xl'>
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
					<DummyAllTab />

					<SearchDummyMoviesTab />

					<SearchDummyTVShowsTab />

					<SearchDummyPeopleTab />

					<SearchDummyCollections />

					<SearchDummyCompanies />
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default SearchDummyTabs;
