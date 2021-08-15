import { ReactElement } from 'react';

export type Direction = 'left' | 'right';

export type ScrollButtonsState = {
  left: boolean;
  right: boolean;
};

export type HorizontalScrollProps = {
  children: ReactElement;
  width?: string;
  spacing?: string | number;
};
