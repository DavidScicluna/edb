import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyHorizontalGridFooter
} from '../../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../../common/hooks';

import { DummyAllTabHorizontalGridProps } from './types';

const DummyAllTabHorizontalGrid: FC<DummyAllTabHorizontalGridProps> = ({ children }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<DummyHorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<DummyHorizontalGridHeader hasTitle hasSubtitle spacing={0} />
			<DummyHorizontalGridBody>
				<DummyHorizontalGridScroll>{children}</DummyHorizontalGridScroll>
			</DummyHorizontalGridBody>
			<DummyHorizontalGridFooter>
				<DummyButton color={color} colorMode={colorMode} isFullWidth size={isSm ? 'xs' : 'sm'} variant='text'>
					View all TOTAL MEDIA-TYPE in Tab
				</DummyButton>
			</DummyHorizontalGridFooter>
		</DummyHorizontalGrid>
	);
};

export default DummyAllTabHorizontalGrid;
