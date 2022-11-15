import { FC } from 'react';

import { range } from 'lodash';

import DummyAllTabHorizontalGrid from '../DummyAllTabHorizontalGrid';
import { DummyVerticalPoster } from '../../../../../../../../../components';
import width from '../../../../../../../../../components/Posters/common/data/width';

const DummyAllTabPeople: FC = () => {
	return (
		<DummyAllTabHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='person' hasSubtitle sx={{ width }} />
			))}
		</DummyAllTabHorizontalGrid>
	);
};

export default DummyAllTabPeople;
