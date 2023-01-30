import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import Page from '../../../containers/Page';
import PageHeader from '../../../containers/Page/components/PageHeader';
import PageBody from '../../../containers/Page/components/PageBody';
import { useUserTheme } from '../../../common/hooks';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import RecentlyViewedDummyTabs from '../components/RecentlyViewedDummyTabs';

const DummyRecentlyViewed: FC = () => {
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Recently Viewed</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>
							A list containing the most recently viewed Movies, TV Shows, People & Collections
						</Text>
					</Skeleton>
				)}
				direction='row'
				spacing={spacing}
				px={spacing}
				py={spacing * 2}
			/>
			<PageBody px={spacing} pb={spacing}>
				<RecentlyViewedDummyTabs />
			</PageBody>
		</Page>
	);
};

export default DummyRecentlyViewed;
