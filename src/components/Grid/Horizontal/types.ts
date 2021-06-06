import { ReactElement } from 'react';

export type ScrollButtonsState = {
  left: boolean;
  right: boolean;
};

export type HorizontalGridProps = {
  children: ReactElement;
  title: string;
  isLoading: boolean;
  path: Partial<Location>;
};
