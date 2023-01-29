import { ReactElement } from 'react';

import { range } from 'lodash';

import dimensions from '../../../../../components/Posters/common/data/dimensions';
import { useUserTheme } from '../../../../../common/hooks';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyVerticalPoster
} from '../../../../../components';
import { ViewSimilarMediaType } from '../common/types';

import { DummyViewSimilarProps } from './types';

const DummyViewSimilar = <MT extends ViewSimilarMediaType>(props: DummyViewSimilarProps<MT>): ReactElement => {
	const { colorMode } = useUserTheme();

	const { mediaType } = props;

	return (
		<DummyHorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<DummyHorizontalGridHeader hasTitle hasSubtitle dummyArrowProps={{ variant: 'icon' }} spacing={0} />
			<DummyHorizontalGridBody>
				<DummyHorizontalGridScroll>
					{range(20).map((_dummy, index) => (
						<DummyVerticalPoster key={index} mediaType={mediaType} hasSubtitle sx={dimensions} />
					))}
				</DummyHorizontalGridScroll>
			</DummyHorizontalGridBody>
		</DummyHorizontalGrid>
	);
};

export default DummyViewSimilar;
