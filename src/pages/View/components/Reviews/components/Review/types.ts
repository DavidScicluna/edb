import { ReactElement } from 'react';

import { Review } from '../../../../../../common/types';

export type ReviewProps = {
  renderFooterActions?: ReactElement;
  review?: Review;
  isLoading?: boolean;
};
