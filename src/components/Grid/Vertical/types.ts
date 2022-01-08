import { ReactElement } from 'react';

import { DisplayMode } from '../../../store/slices/App/types';

type ChildrenProps = {
  displayMode: DisplayMode;
};

export type VerticalGridProps = {
  children: (props: ChildrenProps) => ReactElement[];
};
