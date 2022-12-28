import { ReactNode } from 'react';

import { CardProps } from '@davidscicluna/component-library';

export type ViewReviewsReviewsProps = Pick<CardProps, 'children'> & {
	renderFooter?: () => ReactNode;
	title: string;
	subtitle?: string;
	total?: number;
	hasHeader?: boolean;
};
