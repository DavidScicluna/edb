import { Total } from '../../../../types';
import { AccordionProps } from '../../types';

export type HeaderProps<D> = {
	subtitle?: string;
	total?: Total;
	inView?: boolean;
} & Omit<AccordionProps<D>, 'id' | 'children' | 'footer'>;
