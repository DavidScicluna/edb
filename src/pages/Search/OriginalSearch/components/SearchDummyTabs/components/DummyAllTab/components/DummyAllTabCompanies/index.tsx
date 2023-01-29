import { FC } from 'react';

import { range } from 'lodash';

import DummyAllTabHorizontalGrid from '../DummyAllTabHorizontalGrid';
import { DummyVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';

const DummyAllTabCompanies: FC = () => {
	return (
		<DummyAllTabHorizontalGrid>
			{range(20).map((_dummy, index) => (
				<DummyVerticalPoster key={index} mediaType='company' hasSubtitle sx={dimensions} />
			))}
		</DummyAllTabHorizontalGrid>
	);
};

export default DummyAllTabCompanies;
