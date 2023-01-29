import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { range } from 'lodash';

import dimensions from '../../../../../../../../components/Posters/common/data/dimensions';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyHorizontalGridFooter,
	DummyVerticalPoster
} from '../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../common/hooks';

const DummyOverviewTabGuestStars: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<DummyHorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<DummyHorizontalGridHeader hasTitle hasSubtitle dummyArrowProps={{ variant: 'icon' }} spacing={0} />
			<DummyHorizontalGridBody>
				<DummyHorizontalGridScroll>
					{range(20).map((_dummy, index) => (
						<DummyVerticalPoster key={index} mediaType='person' hasSubtitle sx={dimensions} />
					))}
				</DummyHorizontalGridScroll>
			</DummyHorizontalGridBody>
			<DummyHorizontalGridFooter>
				<DummyButton color={color} colorMode={colorMode} isFullWidth size={isSm ? 'xs' : 'sm'} variant='text'>
					View all ## Guest Stars
				</DummyButton>
			</DummyHorizontalGridFooter>
		</DummyHorizontalGrid>
	);
};

export default DummyOverviewTabGuestStars;
