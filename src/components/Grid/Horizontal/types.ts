import { ReactElement } from 'react';

import { CardVariant } from '../../../common/types/types';

export type Direction = 'left' | 'right';

export type ScrollButtonsState = {
  left: boolean;
  right: boolean;
};

export type HorizontalGridProps = {
  children: ReactElement;
  title: string | ReactElement;
  footer?: ReactElement;
  isLoading: boolean;
  variant?: CardVariant;
};
