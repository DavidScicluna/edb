import { TooltipProps as CUITooltipProps } from '@chakra-ui/react';

type Delay = number | null;

export type TooltipProps = { closeDelay?: Delay; openDelay?: Delay } & Omit<
  CUITooltipProps,
  'arrowShadowColor' | 'closeDelay' | 'colorScheme' | 'hasArrow' | 'openDelay' | 'size' | 'variant'
>;
