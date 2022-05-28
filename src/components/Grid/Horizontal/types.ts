import { ContextType } from 'react';

import { CardProps, CardFooterProps } from '@davidscicluna/component-library';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';


type ScrollMenuContext = ContextType<typeof VisibilityContext>;

export type ScrollMenu = Omit<ScrollMenuContext, 'children' | 'LeftArrow' | 'RightArrow'>;

export type HorizontalGridProps = {
	footer?: CardFooterProps;
	isDisabled?: boolean;
} & Omit<CardProps, 'children' | 'isFullWidth'>;
