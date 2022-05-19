import { ContextType } from 'react';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import { PanelProps } from '../../Panel/types';

type ScrollMenuContext = ContextType<typeof VisibilityContext>;

export type ScrollMenu = Omit<ScrollMenuContext, 'children' | 'LeftArrow' | 'RightArrow'>;

export type HorizontalGridProps = {
	footer?: PanelProps['children']['footer'];
	isDisabled?: boolean;
} & Omit<PanelProps, 'children' | 'isFullWidth' | 'onChange'>;
