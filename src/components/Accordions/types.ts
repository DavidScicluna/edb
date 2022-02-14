import { ReactElement } from 'react';

import { Color } from '../../theme/types';

export type Total = {
  prefix?: string;
  number?: number;
  suffix?: string;
};

export type Accordion<D> = {
  id: string;
  title: string;
  subtitle?: string;
  total?: Total;
  isDisabled?: boolean;
  data?: D;
};

export type RenderProps<D> = {
  isOpen: boolean;
} & Accordion<D>;

export type AccordionsProps<D> = {
  renderAccordion: (props: RenderProps<D>) => ReactElement;
  accordions?: Accordion<D>[];
  color?: keyof Color;
  isError?: boolean;
  isLoading?: boolean;
};
