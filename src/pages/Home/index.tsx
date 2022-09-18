import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import Page from '../../containers/Page';
import PageBody from '../../containers/Page/components/PageBody';

import Popular from './components/Popular';
import TopRated from './components/TopRated';
import Trending from './components/Trending';

const Home: FC = () => {
	return (
		<Page>
			<PageBody>
				<VStack width='100%' px={2} py={4} spacing={4}>
					<Popular />
					<TopRated />
					<Trending />
				</VStack>
			</PageBody>
		</Page>
	);
};

export default Home;
