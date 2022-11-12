import { ReactNode } from 'react';

import { IconButtonProps } from '@davidscicluna/component-library';

type Omitted =
	| 'aria-label'
	| 'children'
	| 'color'
	| 'colorMode'
	| 'isActive'
	| 'onMouseEnter'
	| 'onMouseLeave'
	| 'onClick';

export type DisplayModeProps = Omit<IconButtonProps, Omitted> & {
	separator?: ReactNode;
};
