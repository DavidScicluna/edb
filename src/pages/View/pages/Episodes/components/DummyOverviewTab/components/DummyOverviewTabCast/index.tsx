import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { range } from 'lodash';

import width from '../../../../../../../../components/Posters/common/data/width';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyHorizontalGridFooter,
	DummyVerticalPoster
} from '../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../common/hooks';

const DummyOverviewTabCast: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<DummyHorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<DummyHorizontalGridHeader hasTitle hasSubtitle dummyArrowProps={{ variant: 'icon' }} spacing={0} />
			<DummyHorizontalGridBody>
				<DummyHorizontalGridScroll>
					{range(20).map((_dummy, index) => (
						<DummyVerticalPoster key={index} mediaType='person' hasSubtitle sx={{ width }} />
					))}
				</DummyHorizontalGridScroll>
			</DummyHorizontalGridBody>
			<DummyHorizontalGridFooter>
				<DummyButton color={color} colorMode={colorMode} isFullWidth size={isSm ? 'xs' : 'sm'} variant='text'>
					View all ## Cast
				</DummyButton>
			</DummyHorizontalGridFooter>
		</DummyHorizontalGrid>
	);
};

export default DummyOverviewTabCast;
