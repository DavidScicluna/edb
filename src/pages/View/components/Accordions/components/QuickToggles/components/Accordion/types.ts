import { QuickToggle, QuickTogglesProps } from '../../types';

export type AccordionProps = Partial<QuickToggle> & {
  onToggle?: () => void;
} & Omit<QuickTogglesProps, 'accordions' | 'openedPanels' | 'onToggleAccordion' | 'onToggleAllAccordions'>;
