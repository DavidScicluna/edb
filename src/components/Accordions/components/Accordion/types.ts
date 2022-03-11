import { ReactElement } from 'react';

import { ColorMode } from '@chakra-ui/react';

import { RenderProps, AccordionsProps } from '../../types';

export type AccordionProps<D> = Omit<RenderProps<D>, 'data' | 'onToggleAccordion'> & {
	children: ReactElement;
	footer?: ReactElement;
	colorMode: ColorMode;
	isDisabled?: boolean;
	onToggle: () => void;
} & Omit<AccordionsProps<D>, 'renderAccordion' | 'accordions' | 'colorMode' | 'isError'>;
