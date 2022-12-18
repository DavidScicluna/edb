import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import {
	DummyHorizontalGrid,
	DummyHorizontalGridHeader,
	DummyHorizontalGridBody,
	DummyHorizontalGridScroll,
	DummyHorizontalGridFooter
} from '../../../../../components';
import DummyPhoto from '../components/ViewPhotosHorizontalGridDummyPhoto';

import { DummyViewPhotosHorizontalGridProps } from './types';

const DummyViewPhotosHorizontalGrid: FC<DummyViewPhotosHorizontalGridProps> = ({ photos = [] }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		// TODO: Go over all HorizontalGrid and disabled if loading or error or not items
		<DummyHorizontalGrid colorMode={colorMode} isFullWidth spacing={2} p={2}>
			<DummyHorizontalGridHeader hasTitle hasSubtitle dummyArrowProps={{ variant: 'icon' }} spacing={0} />
			<DummyHorizontalGridBody>
				<DummyHorizontalGridScroll>
					{photos
						.filter((_photo, index) => index < 10)
						.map(({ orientation }, index) => (
							<DummyPhoto key={index} orientation={orientation} />
						))}
				</DummyHorizontalGridScroll>
			</DummyHorizontalGridBody>
			<DummyHorizontalGridFooter>
				<DummyButton color={color} colorMode={colorMode} isFullWidth size={isSm ? 'xs' : 'sm'} variant='text'>
					View all ## photos
				</DummyButton>
			</DummyHorizontalGridFooter>
		</DummyHorizontalGrid>
	);
};

export default DummyViewPhotosHorizontalGrid;
