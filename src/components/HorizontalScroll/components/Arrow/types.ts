import { MouseEvent } from 'react';

import { HorizontalScrollProps } from '../../types';

export type Event = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

type Direction = 'left' | 'right';

export type ArrowProps = {
	direction: Direction;
	onClick: () => void;
} & Omit<HorizontalScrollProps, 'children' | 'renderDivider' | 'isFullWidth'>;
