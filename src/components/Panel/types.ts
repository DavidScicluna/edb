import { ReactElement } from 'react';

import { ColorMode, BoxProps as CUIBoxProps } from '@chakra-ui/react';

import { Color } from '../../theme/types';

export type PanelRef = HTMLDivElement | null;

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'transparent' | 'outlined';

export type Header = {
  title?: ReactElement | string;
  actions?: ReactElement;
};

export type PanelProps = {
  children: {
    header?: Header | ReactElement;
    body: ReactElement;
    footer?: ReactElement;
  };
  color?: keyof Color;
  colorMode?: ColorMode;
  isFullWidth?: boolean;
  hasDivider?: boolean;
  size?: Size;
  variant?: Variant;
} & CUIBoxProps;
