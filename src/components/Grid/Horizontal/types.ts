import { ReactElement } from 'react';

import { CardVariant } from '../../../common/types/types';

export type ScrollButtonsState = {
  left: boolean;
  right: boolean;
};

export type HorizontalGridProps = {
  children: ReactElement;
  title: string | ReactElement;
  footer?: string;
  isLoading: boolean;
  path?: Partial<Location>;
  variant?: CardVariant;
  onFooterClick?: () => void;
};
