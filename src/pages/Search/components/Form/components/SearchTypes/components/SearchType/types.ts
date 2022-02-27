import { ReactNode } from 'react';

import { RenderProps as RenderButtonProps } from '../../../../../../../../components/Clickable/Button/types';
import { SearchType as SearchTypeValue } from '../../../../../../../../store/slices/User/types';
import { Color } from '../../../../../../../../theme/types';

type RenderProps = { isActive: boolean } & RenderButtonProps;

export type SearchType = {
	value: SearchTypeValue;
	label: string;
	color: keyof Color;
	renderLeft: (props: RenderProps) => ReactNode;
};

export type SearchTypeProps = {
	isActive: boolean;
	onClick: (value: SearchTypeValue) => void;
} & SearchType;
