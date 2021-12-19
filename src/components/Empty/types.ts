import { ReactElement } from 'react';

import { CardVariant } from '../../common/types';

export type EmptyProps = {
  button?: ReactElement;
  hasIllustration?: boolean;
  label?: string;
  description?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: CardVariant;
};
