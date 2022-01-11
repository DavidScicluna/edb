import { MouseEvent } from 'react';

export type Event = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

type Direction = 'left' | 'right';

export type ArrowProps = {
  direction: Direction;
  isDisabled: boolean;
  onClick: () => void;
};
