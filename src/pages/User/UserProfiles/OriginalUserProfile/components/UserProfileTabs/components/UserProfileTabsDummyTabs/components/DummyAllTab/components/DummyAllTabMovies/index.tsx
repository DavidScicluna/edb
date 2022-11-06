import { FC } from 'react';

import { range } from 'lodash';

import AllTabDummyHorizontalGrid, { width } from '../DummyAllTabHorizontalGrid';
import { DummyVerticalPoster } from '../../../../../../../../../../../../components';

const AllTabDummyMovies: FC = () => {
	return (
		<AllTabDummyHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='movie' hasSubtitle sx={{ width }} />
			))}
		</AllTabDummyHorizontalGrid>
	);
};

export default AllTabDummyMovies;
