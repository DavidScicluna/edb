import { ReactNode } from 'react';

import { EditUserCommonProps } from '../../common/types';

export type EditUserStructureProps = EditUserCommonProps & {
	children: ReactNode;
	title: string;
	subtitle: string;
	isSubmitDisabled?: boolean;
	onReset?: () => void;
	onSubmit: () => void;
};
