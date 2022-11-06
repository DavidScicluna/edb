import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { rangeRight } from 'lodash';

import { useUserTheme } from '../../../../../../../../../../common/hooks';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridFooter,
	DummyVerticalPoster
} from '../../../../../../../../../../components';

// TODO: Extract vertical poster widths into method
export const width = ['185px', '205px', '230px'];

const OverviewTabWatchlist: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<DummyHorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<DummyHorizontalGridHeader hasTitle hasSubtitle spacing={0} />

			<DummyHorizontalGridBody>
				{rangeRight(20).map((_dummy, index) => (
					<DummyVerticalPoster
						key={index}
						mediaType={index % 2 ? 'tv' : 'movie'}
						hasSubtitle
						sx={{ width }}
					/>
				))}
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
