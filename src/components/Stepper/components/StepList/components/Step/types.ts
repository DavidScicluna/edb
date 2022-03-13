import { StepperContext } from '../../../../types';
import { StepListProps } from '../../types';

export type Status = 'idle' | 'success' | 'error' | 'warning' | 'active';

export type Step = {
	index: number;
	title: string;
	subtitle?: string;
	status: Status;
	isDisabled?: boolean;
};

export type StepProps = Step & {
	color: StepperContext['color'];
	colorMode: StepperContext['colorMode'];
	onClick: () => void;
} & Omit<StepListProps, 'children'>;
