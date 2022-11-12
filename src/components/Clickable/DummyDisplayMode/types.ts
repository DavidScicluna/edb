import { ReactNode } from 'react';

import { DummyIconButtonProps } from '@davidscicluna/component-library';

type Omitted =
	| 'aria-label'
	| 'children'
	| 'color'
	| 'colorMode'
	| 'isActive'
	| 'onMouseEnter'
	| 'onMouseLeave'
	| 'onClick';

export type DummyDisplayModeProps = Omit<DummyIconButtonProps, Omitted> & {
	separator?: ReactNode;
};
