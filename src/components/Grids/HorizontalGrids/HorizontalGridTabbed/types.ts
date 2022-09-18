import { CardProps, TabsProps } from '@davidscicluna/component-library';

import { ScrollContext } from '../types';

export type HorizontalGridTabbedProps = TabsProps & {
	cardProps?: Omit<CardProps, 'children' | 'color' | 'colorMode'>;
};

export type HorizontalGridTabbedContext = { scroll: ScrollContext; onSetScroll: (scroll: ScrollContext) => void };
