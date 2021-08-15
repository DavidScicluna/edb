import { MouseEvent } from 'react';

import { Direction } from '../../../../types';
import { HeaderProps } from '../../types';

export type Event = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

export type ArrowProps = {
  direction: Direction;
  isDisabled: boolean;
} & Omit<HeaderProps, 'title' | 'scrollButtons'>;
