import { MouseEvent } from 'react';

import { CardVariant } from '../../../../../common/types/types';
import { Direction } from '../../types';

export type Event = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

export type ArrowProps = {
  direction: Direction;
  isDisabled: boolean;
  isLoading: boolean;
  reset: boolean;
  onScrollClick: (direction: Direction) => void;
  variant?: CardVariant;
};
