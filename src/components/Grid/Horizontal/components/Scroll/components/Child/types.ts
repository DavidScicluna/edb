import { ReactElement } from 'react';

export type ChildProps = {
	children: ReactElement;
	itemId: string;
	isLast: boolean;
};
