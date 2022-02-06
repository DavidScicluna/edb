import { ReactElement } from 'react';

type RenderProps = {
  padding?: string;
};

export type HorizontalScrollProps = {
  children: ReactElement[];
  renderDivider?: (props: RenderProps) => ReactElement;
  isDisabled?: boolean;
};
