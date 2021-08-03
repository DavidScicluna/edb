import { ReactElement } from 'react';

import { CardVariant } from '../../../../../common/types/types';
import { ScrollButtonsState } from '../../types';

export type HeaderProps = {
  title: string | ReactElement;
  isLoading: boolean;
  reset: boolean;
  scrollButtons: ScrollButtonsState;
  variant?: CardVariant;
  handleScrollClick: (direction: 'left' | 'right') => void;
};
