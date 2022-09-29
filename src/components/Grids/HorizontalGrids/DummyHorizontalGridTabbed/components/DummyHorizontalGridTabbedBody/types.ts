import { ReactNode } from 'react';

import { CardBodyProps, Space } from '@davidscicluna/component-library';

export type DummyHorizontalGridTabbedBodyProps = Omit<CardBodyProps, 'children'> & {
	children: ReactNode[];
	spacing?: Space;
};
