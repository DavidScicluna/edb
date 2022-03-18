import { ReactNode } from 'react';

export type State = {
	hasError: boolean;
};

export type ErrorBoundaryProps = {
	children: ReactNode;
};
