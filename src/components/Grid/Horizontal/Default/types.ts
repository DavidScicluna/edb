import { ReactElement } from 'react';

import { HorizontalGridProps } from '../types';

export type HorizontalGridDefaultProps = {
  children: ReactElement | ReactElement[];
} & HorizontalGridProps;
