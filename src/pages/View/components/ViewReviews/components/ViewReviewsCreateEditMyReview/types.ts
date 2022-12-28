import { ReactElement } from 'react';

import { ButtonProps, IconCategory, IconType, Nullable } from '@davidscicluna/component-library';

import { ViewReviewsMediaType, ViewReviewsProps } from '../../types';
import { UserReview } from '../../../../../../store/slices/Users/types';

export type ViewReviewsCreateEditMyReviewForm = {
	rating: Nullable<number>;
	content: string;
};

export type ViewReviewsCreateEditMyReviewRenderButtonProps = Pick<ButtonProps, 'color' | 'colorMode' | 'onClick'> & {
	icon: IconType;
	category: IconCategory;
};

type Picked = 'mediaType' | 'mediaItem';

export type ViewReviewsCreateEditMyReviewProps<MT extends ViewReviewsMediaType> = Pick<ViewReviewsProps<MT>, Picked> & {
	renderButton: (props: ViewReviewsCreateEditMyReviewRenderButtonProps) => ReactElement;
	review?: UserReview;
};
