import { ReactNode } from 'react';

import { Space } from '@davidscicluna/component-library';

import { SimpleGridProps } from '@chakra-ui/react';

import { DisplayMode } from '../../../store/slices/App/types';

type ChildrenProps = {
	displayMode: DisplayMode;
};

export type VerticalGridProps = {
	children: (props: ChildrenProps) => ReactNode[];
	columns?: SimpleGridProps['columns'];
	displayMode?: DisplayMode;
	spacing?: Space;
};
