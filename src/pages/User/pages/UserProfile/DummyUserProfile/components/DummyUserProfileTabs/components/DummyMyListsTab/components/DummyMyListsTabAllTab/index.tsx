import { FC } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { range } from 'lodash';

import DummyList from './components/DummyList';

const DummyMyListsTabAllTab: FC = () => {
	return (
		<SimpleGrid width='100%' columns={[1, 2, 4, 4, 5, 6]} spacing={2}>
			{range(5).map((_dummy, index) => (
				<DummyList key={index} />
			))}
		</SimpleGrid>
	);
};

export default DummyMyListsTabAllTab;
