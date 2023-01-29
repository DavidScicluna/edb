import { FC } from 'react';

import { range } from 'lodash';

import DummyAllTabHorizontalGrid from '../DummyAllTabHorizontalGrid';
import { DummyVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';

const DummyAllTabMovies: FC = () => {
	return (
		<DummyAllTabHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='movie' hasSubtitle sx={dimensions} />
			))}
		</DummyAllTabHorizontalGrid>
	);
};

export default DummyAllTabMovies;
