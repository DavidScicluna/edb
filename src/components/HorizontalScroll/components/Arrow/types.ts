import { MouseEvent } from 'react';

import { Direction } from '../../types';

export type Event = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

export type ArrowProps = {
  direction: Direction;
  isDisabled: boolean;
  reset: boolean;
  onScrollClick: (direction: Direction) => void;
};
