import { ReactNode } from 'react';

import { ThemeColorMode } from '../../../../../../../store/slices/Users/types';

type RenderProps = {
	isActive: boolean;
	fontSize: string;
};

export type ColorMode = {
	label: string;
	value: ThemeColorMode;
	renderLeft: (props: RenderProps) => ReactNode;
};
