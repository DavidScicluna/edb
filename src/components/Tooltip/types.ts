import { ReactElement } from 'react';

import { ColorMode, TooltipProps as CUITooltipProps } from '@chakra-ui/react';

export type TooltipRef = HTMLDivElement | null;

export type TooltipProps = {
	'children': ReactElement;
	'aria-label': string;
	'colorMode'?: ColorMode;
	'isOpen': boolean;
	'closeDelay'?: number;
	'openDelay'?: number;
} & Omit<
	CUITooltipProps,
	| 'children'
	| 'aria-label'
	| 'arrowPadding'
	| 'arrowShadowColor'
	| 'arrowSize'
	| 'closeDelay'
	| 'colorScheme'
	| 'direction'
	| 'hasArrow'
	| 'isOpen'
	| 'modifiers'
	| 'offset'
	| 'openDelay'
	| 'portalProps'
	| 'size'
	| 'variant'
>;
