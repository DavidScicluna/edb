import { ReactNode } from 'react';

type SearchFormChildren = {
	input: ReactNode;
	collapsible: ReactNode;
	info: ReactNode;
};

export type SearchFormProps = {
	children: SearchFormChildren;
	isFocused: boolean;
	onFocus: () => void;
	onBlur: () => void;
};
