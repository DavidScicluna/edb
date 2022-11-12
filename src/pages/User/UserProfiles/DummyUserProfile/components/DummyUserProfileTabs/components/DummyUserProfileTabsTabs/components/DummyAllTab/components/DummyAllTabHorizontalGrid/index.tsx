import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../../../../common/hooks';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyHorizontalGridFooter
} from '../../../../../../../../../../../../components';

import { DummyAllTabHorizontalGridProps } from './types';

// TODO: Extract vertical poster widths into method
export const width = ['185px', '205px', '230px'];

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
