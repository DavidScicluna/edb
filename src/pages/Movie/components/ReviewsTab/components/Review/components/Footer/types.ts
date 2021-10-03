import { ReactElement } from 'react';

import { OtherReview } from '../../../../../../../../store/slices/User/types';

export type FooterProps = {
  renderActions: ReactElement;
  updated_at?: OtherReview['updated_at'];
  created_at?: OtherReview['created_at'];
};
