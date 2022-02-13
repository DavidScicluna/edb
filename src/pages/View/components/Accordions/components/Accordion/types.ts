import { ReactElement } from 'react';

import { RenderProps, AccordionsProps } from '../../types';

export type AccordionProps<D> = Omit<RenderProps<D>, 'data' | 'onToggleAccordion'> & {
  children: ReactElement;
  footer?: ReactElement;
  isDisabled?: boolean;
  isLoading?: boolean;
  onToggle: () => void;
} & Omit<AccordionsProps<D>, 'renderAccordion' | 'accordions' | 'isError'>;
