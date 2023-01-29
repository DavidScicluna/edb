import { FC } from 'react';

import { range } from 'lodash';

import { DummyVerticalPoster } from '../../../../../../components';
import TrendingDummyAllTabHorizontalGrid from '../TrendingDummyAllTabHorizontalGrid';
import dimensions from '../../../../../../components/Posters/common/data/dimensions';

const TrendingDummyAllTabMovies: FC = () => {
	return (
		<TrendingDummyAllTabHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='movie' hasSubtitle sx={dimensions} />
			))}
		</TrendingDummyAllTabHorizontalGrid>
	);
};

export default TrendingDummyAllTabMovies;
