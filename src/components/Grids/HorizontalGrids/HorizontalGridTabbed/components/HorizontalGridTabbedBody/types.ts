import { ReactElement } from 'react';

import { Space, CardBodyProps, HorizontalScrollProps } from '@davidscicluna/component-library';

type ChildrenProps = Pick<HorizontalScrollProps, 'children'>;

export type HorizontalGridTabbedBodyProps = Omit<CardBodyProps, 'children'> & {
	children: ReactElement<ChildrenProps>[];
	spacing?: Space;
};
