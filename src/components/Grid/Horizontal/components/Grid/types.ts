import { ReactElement, Ref } from 'react';

import { CardVariant } from '../../../../../common/types/types';

export type GridProps = {
  children: ReactElement;
  gridRef: Ref<HTMLDivElement> | undefined;
  variant?: CardVariant;
  handleScrollChange: (event: any) => void;
};
