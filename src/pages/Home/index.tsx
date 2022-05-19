import { ReactElement } from 'react';

import { VStack } from '@chakra-ui/react';

import Page from '../../containers/Page';

import Popular from './components/Popular';
import TopRated from './components/TopRated';
import Trending from './components/Trending';


const Home = (): ReactElement => {
	return (
		<Page>
			{{
				body: (
					<VStack px={2} pt={4} spacing={4}>
						<Popular />
						<TopRated />
						<Trending />
					</VStack>
				)
			}}
		</Page>
	);
};

export default Home;
