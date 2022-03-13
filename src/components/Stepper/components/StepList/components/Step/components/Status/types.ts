import { StepProps } from '../../types';

export type StatusProps = Omit<StepProps, 'index' | 'title' | 'subtitle' | 'onClick'>;
