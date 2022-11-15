import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../../../../../common/hooks';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyHorizontalGridFooter
} from '../../../../../../../../../../../../../components';

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
					Dummy All Tab Horizontal Grid Footer
				</DummyButton>
			</DummyHorizontalGridFooter>
		</DummyHorizontalGrid>
	);
};

export default DummyAllTabHorizontalGrid;
