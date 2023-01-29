import { FC } from 'react';

import { range } from 'lodash';

import dimensions from '../../../../../../../../../../../../../components/Posters/common/data/dimensions';
import AllTabDummyHorizontalGrid from '../DummyAllTabHorizontalGrid';
import { DummyVerticalPoster } from '../../../../../../../../../../../../../components';

const AllTabDummyTVShows: FC = () => {
	return (
		<AllTabDummyHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='tv' hasSubtitle sx={dimensions} />
			))}
		</AllTabDummyHorizontalGrid>
	);
};

export default AllTabDummyTVShows;
