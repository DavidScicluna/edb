import { ReactElement } from 'react';

import { CardBodyProps, HorizontalScrollProps } from '@davidscicluna/component-library';

type ChildrenProps = Pick<HorizontalScrollProps, 'children'>;

export type HorizontalGridTabbedBodyProps = Omit<CardBodyProps, 'children'> & {
	children: ReactElement<ChildrenProps>[];
};
