import { ReactElement } from 'react';

export type RenderProps = {
  color: string;
  fontSize: 'xs' | 'sm' | '2xl' | '3xl';
  fontWeight: string;
};

export type TitleProps = {
  renderTitle: (props: RenderProps) => ReactElement;
  renderSubtitles?: (props: Omit<RenderProps, 'fontWeight'>) => ReactElement[];
  isLoading: boolean;
};
