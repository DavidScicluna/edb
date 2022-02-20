import { ReactElement } from 'react';

import { useMediaQuery, SimpleGrid } from '@chakra-ui/react';

import { VerticalGridProps } from './types';

import { useSelector } from '../../../common/hooks';
import { DisplayMode } from '../../../store/slices/App/types';

const VerticalGrid = (props: VerticalGridProps): ReactElement => {
	const [isXs] = useMediaQuery('(max-width: 320px)');
	const [isXl] = useMediaQuery('(min-width: 1920px)');

	const displayModeState = useSelector((state) => state.app.ui.displayMode);

	const { children, columns, displayMode: displayModeProp } = props;

	const displayMode: DisplayMode = displayModeProp || displayModeState;

	return (
		<SimpleGrid
			width='100%'
			// columns={displayMode === 'list' ? 1 : [isXs ? 1 : 2, 3, 4, 5, 5, isXl ? 7 : 6]} // Old columns sizes
			columns={displayMode === 'list' ? 1 : columns || [isXs ? 1 : 2, 2, 4, 4, 5, isXl ? 6 : 5]} // New with Container width in Layout
			spacing={2}
		>
			{children({ displayMode })}
		</SimpleGrid>
	);
};

export default VerticalGrid;
