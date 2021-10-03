import { ReactElement } from 'react';

import { Review } from '../../../../../../common/types/movie';

export type ReviewProps = {
  renderFooterActions: ReactElement;
  review?: Review;
  isLoading?: boolean;
};
