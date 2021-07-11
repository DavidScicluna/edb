import { ReactElement } from 'react';

import { TooltipProps as CUITooltipProps } from '@chakra-ui/react';

type Delay = number | null;

export type TooltipProps = {
  children: ReactElement;
  width?: string;
  closeDelay?: Delay;
  openDelay?: Delay;
  span?: boolean;
} & Omit<
  CUITooltipProps,
  | 'children'
  | 'arrowShadowColor'
  | 'closeDelay'
  | 'colorScheme'
  | 'hasArrow'
  | 'openDelay'
  | 'size'
  | 'variant'
  | 'width'
>;
