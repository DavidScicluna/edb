import { ReactElement } from 'react';

import { Color } from '@davidscicluna/component-library';

import { UserReviewsProps } from '../../types';

export type Form = {
	review: string;
	rating: number | null;
};

type RenderProps = {
	color: Color;
	label: string;
	isDisabled: boolean;
	onClick: () => void;
};

export type CreateReviewProps = {
	renderAction: (props: RenderProps) => ReactElement;
} & Omit<UserReviewsProps, 'alt' | 'isLoading'>;
