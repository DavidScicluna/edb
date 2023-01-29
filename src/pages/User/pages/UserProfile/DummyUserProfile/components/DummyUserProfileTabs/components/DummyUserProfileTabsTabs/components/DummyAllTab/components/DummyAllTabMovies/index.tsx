import { FC } from 'react';

import { range } from 'lodash';

import AllTabDummyHorizontalGrid from '../DummyAllTabHorizontalGrid';
import { DummyVerticalPoster } from '../../../../../../../../../../../../../components';
import dimensions from '../../../../../../../../../../../../../components/Posters/common/data/dimensions';

const AllTabDummyMovies: FC = () => {
	return (
		<AllTabDummyHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='movie' hasSubtitle sx={dimensions} />
			))}
		</AllTabDummyHorizontalGrid>
	);
};

export default AllTabDummyMovies;
