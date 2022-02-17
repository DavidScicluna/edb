import { ReactElement } from 'react';

import { HorizontalScrollProps } from '../../types';

export type ChildProps = {
	children: ReactElement;
	renderDivider?: HorizontalScrollProps['renderDivider'];
	itemId: string;
	isLast: boolean;
};
