import { FC } from 'react';

import { range } from 'lodash';

import AllTabDummyHorizontalGrid from '../DummyAllTabHorizontalGrid';
import { DummyVerticalPoster } from '../../../../../../../../../../../../../components';
import width from '../../../../../../../../../../../../../components/Posters/common/data/width';

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
