import { ReactNode } from 'react';

import { NoUndefinedField } from '@davidscicluna/component-library';

import { Review } from '../../../../../../common/types';

export type ViewReviewsReviewProps = NoUndefinedField<Pick<Review, 'content'>> &
	Pick<Review, 'created_at' | 'updated_at'> & {
		renderFooterActions?: () => ReactNode;
	} & Review['author_details'];
