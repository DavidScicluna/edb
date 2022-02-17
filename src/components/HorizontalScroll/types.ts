import { ReactElement } from 'react';

export type HorizontalScrollRef = HTMLDivElement | null;

type RenderProps = {
	padding?: string;
};

export type HorizontalScrollProps = {
	children: ReactElement[];
	renderDivider?: (props: RenderProps) => ReactElement;
	isDisabled?: boolean;
};
