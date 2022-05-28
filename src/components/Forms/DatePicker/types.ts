import { ReactElement, ReactNode } from 'react';

import { Color } from '@davidscicluna/component-library';

import { Props } from 'dayzed';

export type RenderToggleModalProps = {
	color: Color;
	icon: ReactNode;
	onClick: () => void;
};

export type DatePickerProps = {
	renderToggleModal: (props: RenderToggleModalProps) => ReactElement;
	color: Color;
	onSetDate: (date: Date) => void;
	value?: Date;
} & Omit<Props, 'children' | 'render' | 'monthsToDisplay' | 'selected' | 'onDateSelected'>;
