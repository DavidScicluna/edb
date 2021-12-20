import { ReactElement, Ref, UIEvent, SyntheticEvent } from 'react';

import { Variant } from '../../../../Panel/types';

export type GridProps = {
  children: ReactElement;
  gridRef: Ref<HTMLDivElement> | undefined;
  hasDivider?: boolean;
  handleScrollChange: (event: UIEvent<HTMLDivElement, globalThis.UIEvent> | SyntheticEvent<HTMLDivElement>) => void;
  variant?: Variant;
};
