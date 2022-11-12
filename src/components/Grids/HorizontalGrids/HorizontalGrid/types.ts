import { CardProps } from '@davidscicluna/component-library';

import { ScrollContext } from '../types';

export type HorizontalGridProps = CardProps;

export type HorizontalGridContext = Pick<HorizontalGridProps, 'isDisabled'> & {
	scroll: ScrollContext;
	onSetScroll: (scroll: ScrollContext) => void;
};
