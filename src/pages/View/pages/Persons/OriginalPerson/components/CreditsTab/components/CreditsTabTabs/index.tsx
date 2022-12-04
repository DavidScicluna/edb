import { FC, lazy } from 'react';

import { Tabs, TabList, TabPanels } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { Suspense, TabDisplayMode, TabIcon } from '../../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatMediaTypeLabel, getMediaTypeIcon } from '../../../../../../../../../common/utils';

import { CreditsTabTabsProps } from './types';

const MoviesTab = lazy(() => import('../CreditsTabMoviesTab'));
const TVShowsTab = lazy(() => import('../CreditsTabTVShowsTab'));

const CreditsTabTabs: FC<CreditsTabTabsProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { activeTab = 0, movieDepartments = [], tvShowDepartments = [], onChange } = props;

	return (
		<Tabs width='100%' color={color} colorMode={colorMode} activeTab={activeTab} onChange={onChange} size='lg'>
			<VStack width='100%' spacing={2}>
				<TabList
					tabs={[
						{
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
							renderLeft: (props) => (
								<TabIcon
									{...props}
									icon={getMediaTypeIcon({ mediaType: 'movie' })}
									category={activeTab === 1 ? 'filled' : 'outlined'}
								/>
							)
						},
						{
							label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
							renderLeft: (props) => (
								<TabIcon
									{...props}
									icon={getMediaTypeIcon({ mediaType: 'tv' })}
									category={activeTab === 2 ? 'filled' : 'outlined'}
								/>
							)
						}
					]}
					renderRight={() => <TabDisplayMode />}
				/>

				<TabPanels>
					<Suspense
					// fallback={<DummyMoviesTab />}
					>
						<MoviesTab movieDepartments={movieDepartments} />
					</Suspense>

					<Suspense
					// fallback={<DummyTVShowsTab />}
					>
						<TVShowsTab tvShowDepartments={tvShowDepartments} />
					</Suspense>
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default CreditsTabTabs;
