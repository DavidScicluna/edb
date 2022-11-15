import { FC } from 'react';

import { range } from 'lodash';

import width from '../../../../../../../../../../../../../components/Posters/common/data/width';
import AllTabDummyHorizontalGrid from '../DummyAllTabHorizontalGrid';
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
