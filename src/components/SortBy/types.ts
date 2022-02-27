import { ReactElement, ReactNode } from 'react';

import { Color } from '../../theme/types';

export type SortBy = {
	label: string;
	value: string;
};

export type SortDirection = 'asc' | 'desc';

export type Form = {
	sortBy: SortBy;
	direction: SortDirection;
};

export type RenderButtonProps = {
	color: keyof Color;
	icon: ReactNode;
	onClick: () => void;
};

export type SortByProps = {
	renderButton: (props: RenderButtonProps) => ReactElement;
	sortBy: SortBy[];
	onSort: (form: Form) => void;
};
