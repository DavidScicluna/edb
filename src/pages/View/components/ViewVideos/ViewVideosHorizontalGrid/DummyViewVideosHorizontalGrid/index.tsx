import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery, Center } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../common/hooks';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyHorizontalGridFooter
} from '../../../../../../components';
import DummyVideo from '../../components/ViewVideosDummyVideo';
import widths from '../common/data/widths';

const DummyViewVideosHorizontalGrid: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<DummyHorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<DummyHorizontalGridHeader hasTitle hasSubtitle dummyArrowProps={{ variant: 'icon' }} spacing={0} />
			<DummyHorizontalGridBody>
				<DummyHorizontalGridScroll>
					{range(5).map((_dummy, index) => (
						<Center key={index} width={widths}>
							<DummyVideo />
						</Center>
					))}
				</DummyHorizontalGridScroll>
			</DummyHorizontalGridBody>
			<DummyHorizontalGridFooter>
				<DummyButton color={color} colorMode={colorMode} isFullWidth size={isSm ? 'xs' : 'sm'} variant='text'>
					View all ## videos
				</DummyButton>
			</DummyHorizontalGridFooter>
		</DummyHorizontalGrid>
	);
};

export default DummyViewVideosHorizontalGrid;
