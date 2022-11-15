import { FC } from 'react';

import { range } from 'lodash';

import { DummyVerticalPoster } from '../../../../../../components';
import TrendingDummyAllTabHorizontalGrid from '../TrendingDummyAllTabHorizontalGrid';
import width from '../../../../../../components/Posters/common/data/width';

const TrendingDummyAllTabPeople: FC = () => {
	return (
		<TrendingDummyAllTabHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='person' hasSubtitle sx={{ width }} />
			))}
		</TrendingDummyAllTabHorizontalGrid>
	);
};

export default TrendingDummyAllTabPeople;
