import { ReactNode } from 'react';

import { Color } from '@davidscicluna/component-library';

export type RenderProps = {
	width?: string;
	height?: string;
	color?: Color;
	isSelected?: boolean;
	fontSize?: string;
	size?: 'xs' | 'sm' | 'md';
};

export type Tab = {
	label: string;
	renderLeft?: (props: RenderProps) => ReactNode;
	renderRight?: (props: RenderProps) => ReactNode;
	isDisabled?: boolean;
};

export type Size = 'sm' | 'md' | 'lg';

export type TabsProps = Tab & {
	color?: keyof Color;
	isSelected: boolean;
	isOnlyTab?: boolean;
	isFullWidth?: boolean;
	size?: Size;
};
