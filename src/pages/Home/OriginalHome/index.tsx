import { FC, useContext } from 'react';

import { VStack } from '@chakra-ui/react';

import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import { spacing as defaultSpacing } from '../../../containers/Layout/common/data/defaultPropValues';
import { LayoutContext as LayoutContextType } from '../../../containers/Layout/types';
import { LayoutContext } from '../../../containers/Layout';

import Popular from './components/Popular';
import TopRated from './components/TopRated';
import Trending from './components/Trending';

const Home: FC = () => {
	const { spacing = defaultSpacing } = useContext<LayoutContextType>(LayoutContext);

	return (
		<Page>
			<PageBody>
				<VStack width='100%' px={spacing} py={spacing} spacing={spacing}>
					<Popular />
					<TopRated />
					<Trending />
				</VStack>
			</PageBody>
		</Page>
	);
};

export default Home;
