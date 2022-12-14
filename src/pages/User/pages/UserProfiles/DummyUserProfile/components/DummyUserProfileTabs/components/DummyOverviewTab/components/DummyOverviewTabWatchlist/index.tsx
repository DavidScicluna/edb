import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { rangeRight } from 'lodash';

import { useUserTheme } from '../../../../../../../../../../../common/hooks';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyHorizontalGridFooter,
	DummyVerticalPoster
} from '../../../../../../../../../../../components';
import width from '../../../../../../../../../../../components/Posters/common/data/width';

const OverviewTabWatchlist: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<DummyHorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<DummyHorizontalGridHeader hasTitle hasSubtitle dummyArrowProps={{ variant: 'icon' }} spacing={0} />

			<DummyHorizontalGridBody>
				<DummyHorizontalGridScroll>
					{rangeRight(20).map((_dummy, index) => (
						<DummyVerticalPoster
							key={index}
							mediaType={index % 2 ? 'tv' : 'movie'}
							hasSubtitle
							sx={{ width }}
						/>
					))}
				</DummyHorizontalGridScroll>
			</DummyHorizontalGridBody>

			<DummyHorizontalGridFooter>
				<DummyButton color={color} colorMode={colorMode} isFullWidth size={isSm ? 'xs' : 'sm'} variant='text'>
					Dummy All Tab Horizontal Grid Footer
				</DummyButton>
			</DummyHorizontalGridFooter>
		</DummyHorizontalGrid>
	);
};

export default OverviewTabWatchlist;
