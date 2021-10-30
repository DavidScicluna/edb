import { PanelProps } from '../../types';

export type GridProps = Omit<PanelProps, 'id' | 'title' | 'total' | 'isOpen' | 'onToggle'>;
