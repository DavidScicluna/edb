import { ReactNode } from 'react';

import { StackProps } from '@chakra-ui/react';

import { Step } from '../StepList/components/Step/types';

export type StepPanelProps = StackProps & {
	children: ReactNode;
	total: number;
} & Omit<Step, 'status' | 'isDisabled'>;
