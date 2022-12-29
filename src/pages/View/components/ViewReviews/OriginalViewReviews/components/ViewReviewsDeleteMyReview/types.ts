import { ReactElement } from 'react';

import { ButtonProps, IconCategory, IconType } from '@davidscicluna/component-library';

import { ViewReviewsMediaType, ViewReviewsProps } from '../../types';
import { UserReview } from '../../../../../../../store/slices/Users/types';

export type ViewReviewsDeleteMyReviewRenderButtonProps = Pick<ButtonProps, 'color' | 'colorMode' | 'onClick'> & {
	icon: IconType;
	category: IconCategory;
};

type Picked = 'mediaType' | 'mediaItem';

export type ViewReviewsDeleteMyReviewProps<MT extends ViewReviewsMediaType> = Pick<ViewReviewsProps<MT>, Picked> & {
	renderButton: (props: ViewReviewsDeleteMyReviewRenderButtonProps) => ReactElement;
	review: UserReview;
};
