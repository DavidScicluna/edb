import { FC } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { useSelector } from '../../../common/hooks';

import { VerticalGridProps } from './types';

const VerticalGrid: FC<VerticalGridProps> = (props) => {
	const displayModeState = useSelector((state) => state.app.ui.displayMode);

	const { children, columns = [2, 2, 4, 4, 4, 5], displayMode = displayModeState, spacing = 2 } = props;

	return (
		<SimpleGrid width='100%' columns={displayMode === 'list' ? 1 : columns} spacing={spacing}>
			{children({ displayMode })}
		</SimpleGrid>
	);
};

export default VerticalGrid;
