import { ReactNode } from 'react';

import { CardProps } from '@davidscicluna/component-library';

export type ViewReviewsDummyReviewsProps = Pick<CardProps, 'children'> & {
	renderFooter?: () => ReactNode;
	title: string;
	subtitle?: string;
	hasHeader?: boolean;
};
