import { FC } from 'react';

import { range } from 'lodash';

import AllTabDummyHorizontalGrid, { width } from '../DummyAllTabHorizontalGrid';
import { DummyVerticalPoster } from '../../../../../../../../../../../../../components';

const AllTabDummyTVShows: FC = () => {
	return (
		<AllTabDummyHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='tv' hasSubtitle sx={{ width }} />
			))}
		</AllTabDummyHorizontalGrid>
	);
};

export default AllTabDummyTVShows;
