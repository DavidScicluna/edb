import { StepProps } from '../../types';

export type DescriptionProps = Omit<StepProps, 'color' | 'status' | 'onClick'>;
