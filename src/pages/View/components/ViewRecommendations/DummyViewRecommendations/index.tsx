import { ReactElement } from 'react';

import { range } from 'lodash';

import width from '../../../../../components/Posters/common/data/width';
import { useUserTheme } from '../../../../../common/hooks';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyVerticalPoster
} from '../../../../../components';
import { ViewRecommendationsMediaType } from '../common/types';

import { DummyViewRecommendationsProps } from './types';

const DummyViewRecommendations = <MT extends ViewRecommendationsMediaType>(
	props: DummyViewRecommendationsProps<MT>
): ReactElement => {
	const { colorMode } = useUserTheme();

	const { mediaType } = props;

	return (
		<DummyHorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<DummyHorizontalGridHeader hasTitle hasSubtitle dummyArrowProps={{ variant: 'icon' }} spacing={0} />
			<DummyHorizontalGridBody>
				<DummyHorizontalGridScroll>
					{range(20).map((_dummy, index) => (
						<DummyVerticalPoster key={index} mediaType={mediaType} hasSubtitle sx={{ width }} />
					))}
				</DummyHorizontalGridScroll>
			</DummyHorizontalGridBody>
		</DummyHorizontalGrid>
	);
};

export default DummyViewRecommendations;
