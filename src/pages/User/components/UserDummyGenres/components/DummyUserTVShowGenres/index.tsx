import { FC } from 'react';

import { DummyCard, DummyCardHeader, CardBody } from '@davidscicluna/component-library';

import { Wrap, WrapItem } from '@chakra-ui/react';

import { range } from 'lodash';

import DummyActions from '../DummyUserGenresActions';
import DummyGenre from '../DummyUserGenre';
import { useUserTheme } from '../../../../../../common/hooks';

const DummyUserTVShowGenres: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader actions={<DummyActions />} />
			<CardBody>
				<Wrap width='100%' spacing={1.5}>
					{range(15).map((_dummy, index) => (
						<WrapItem key={index}>
							<DummyGenre />
						</WrapItem>
					))}
				</Wrap>
			</CardBody>
		</DummyCard>
	);
};

export default DummyUserTVShowGenres;
