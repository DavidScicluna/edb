import { ReactNode } from 'react';

import { FontSizes } from '../../../../../../../theme/types';
import { Form } from '../../types';

type RenderProps = {
	isActive: boolean;
	fontSize: FontSizes['2xl'];
};

export type Background = {
	label: string;
	value: Form['background'];
	renderLeft: (props: RenderProps) => ReactNode;
};
