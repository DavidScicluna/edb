import { ReactElement } from 'react';

import { TooltipProps as CUITooltipProps } from '@chakra-ui/react';

type Delay = number | null;

export type TooltipProps = {
  'children': ReactElement;
  'aria-label': string;
  'isOpen': boolean;
  'closeDelay'?: Delay;
  'openDelay'?: Delay;
} & Omit<
  CUITooltipProps,
  | 'children'
  | 'aria-label'
  | 'arrowPadding'
  | 'arrowShadowColor'
  | 'arrowSize'
  | 'closeDelay'
  | 'colorScheme'
  | 'hasArrow'
  | 'isOpen'
  | 'modifiers'
  | 'openDelay'
  | 'offset'
  | 'size'
  | 'variant'
>;
