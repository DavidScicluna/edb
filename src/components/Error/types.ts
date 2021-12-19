import { ReactElement } from 'react';

import { CardVariant } from '../../common/types';

export type ErrorProps = {
  button?: ReactElement;
  hasIllustration?: boolean;
  label?: string;
  description?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: CardVariant;
};
