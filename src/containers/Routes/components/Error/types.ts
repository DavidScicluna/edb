import { ReactNode } from 'react';

import { ButtonProps } from '@davidscicluna/component-library';

export type RenderActionsProps = Pick<ButtonProps, 'color' | 'colorMode' | 'size' | 'variant'>;

export type ErrorProps = {
	code: number;
	title: string;
	subtitle: string;
	renderActions?: (props: RenderActionsProps) => ReactNode;
};
