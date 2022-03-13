import { StepProps } from '../../types';

export type StepIconRef = HTMLDivElement | null;

export type StepIconProps = Omit<StepProps, 'index' | 'title' | 'subtitle' | 'onClick'>;
