import { StepperContext } from '../../../../types';
import { StepListProps } from '../../types';

export type NextProps = {
	color: StepperContext['color'];
	colorMode: StepperContext['colorMode'];
	isDisabled?: boolean;
	isLast?: boolean;
	hasErrors?: boolean;
	hasWarnings?: boolean;
	hasIdle?: boolean;
	onNext?: () => void;
} & Omit<StepListProps, 'children'>;
