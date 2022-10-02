import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';

import Popular from './components/Popular';
import TopRated from './components/TopRated';
import Trending from './components/Trending';

const Home: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<Page>
			<PageBody>
				<VStack width='100%' p={spacing} spacing={spacing}>
					<Popular />
					<TopRated />
					<Trending />
				</VStack>
			</PageBody>
		</Page>
	);
};

export default Home;
