import { FC } from 'react';

import { range } from 'lodash';

import { VerticalGrid } from '../../../../../../components';
import DummyVideo from '../../components/ViewVideosDummyVideo';

const DummyViewVideosVerticalGrid: FC = () => {
	return (
		<VerticalGrid displayMode='grid'>
			{() => range(5).map((_dummy, index) => <DummyVideo key={index} />)}
		</VerticalGrid>
	);
};

export default DummyViewVideosVerticalGrid;
