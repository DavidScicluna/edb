// import { ReactNode } from 'react';

import { Color } from '@davidscicluna/component-library';

// import { RenderProps as RenderButtonProps } from '../../../../../../../../components/Clickable/Button/types';
import { SearchType as SearchTypeValue } from '../../../../../../../../store/slices/Users/types';

// type RenderProps = { isActive: boolean } & RenderButtonProps;

export type SearchType = {
	value: SearchTypeValue;
	label: string;
	color: Color;
	// renderLeft: (props: RenderProps) => ReactNode;
};

export type SearchTypeProps = {
	isActive: boolean;
	onClick: (value: SearchTypeValue) => void;
} & SearchType;
