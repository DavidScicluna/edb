import { Step as StepType, Status } from './components/Step/types';

export type Step = {
	status?: Omit<Status, 'idle' | 'active'>;
} & Omit<StepType, 'index' | 'status'>;

export type StepListProps = {
	children: Step[];
};
