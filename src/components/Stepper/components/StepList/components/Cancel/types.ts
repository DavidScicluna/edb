import { StepperContext } from '../../../../types';
import { StepListProps } from '../../types';

export type CancelProps = {
	color: StepperContext['color'];
	colorMode: StepperContext['colorMode'];
	isDisabled?: boolean;
	onCancel?: () => void;
} & Omit<StepListProps, 'children'>;
