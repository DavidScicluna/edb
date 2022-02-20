import { ReactElement } from 'react';

import { SimpleGridProps } from '@chakra-ui/react';

import { DisplayMode } from '../../../store/slices/App/types';

type ChildrenProps = {
	displayMode: DisplayMode;
};

export type VerticalGridProps = {
	children: (props: ChildrenProps) => ReactElement[];
	columns?: SimpleGridProps['columns'];
	displayMode?: DisplayMode;
};
