import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { range } from 'lodash';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { DummyVerticalPoster } from '../../../../../../../components';

import DummyAllTabHorizontalGrid, { width } from './components/DummyAllTabHorizontalGrid';

const DummyAllTab: FC = () => {
	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			{/* Movies */}
			<DummyAllTabHorizontalGrid>
				{range(20).map((_dummy, index) => (
					<DummyVerticalPoster key={index} mediaType='movie' hasSubtitle sx={{ width }} />
				))}
			</DummyAllTabHorizontalGrid>

			{/* TV Shows */}
			<DummyAllTabHorizontalGrid>
				{range(20).map((_dummy, index) => (
					<DummyVerticalPoster key={index} mediaType='tv' hasSubtitle sx={{ width }} />
				))}
			</DummyAllTabHorizontalGrid>

			{/* People */}
			<DummyAllTabHorizontalGrid>
				{range(20).map((_dummy, index) => (
					<DummyVerticalPoster key={index} mediaType='person' hasSubtitle sx={{ width }} />
				))}
			</DummyAllTabHorizontalGrid>

			{/* Companies */}
			<DummyAllTabHorizontalGrid>
				{range(20).map((_dummy, index) => (
					<DummyVerticalPoster key={index} mediaType='company' hasSubtitle sx={{ width }} />
				))}
			</DummyAllTabHorizontalGrid>

			{/* Collections */}
			<DummyAllTabHorizontalGrid>
				{range(20).map((_dummy, index) => (
					<DummyVerticalPoster key={index} mediaType='collection' hasSubtitle sx={{ width }} />
				))}
			</DummyAllTabHorizontalGrid>
		</VStack>
	);
};

export default DummyAllTab;
