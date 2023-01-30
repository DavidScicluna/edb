import { FC } from 'react';

import { range } from 'lodash';

import AllTabDummyHorizontalGrid from '../DummyAllTabHorizontalGrid';
import { DummyVerticalPoster } from '../../../../../../../../components';
import dimensions from '../../../../../../../../components/Posters/common/data/dimensions';

const DummyAllTabCollections: FC = () => {
	return (
		<AllTabDummyHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='collection' hasSubtitle sx={dimensions} />
			))}
		</AllTabDummyHorizontalGrid>
	);
};

export default DummyAllTabCollections;
