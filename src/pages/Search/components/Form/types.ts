import { ReactElement } from 'react';

import { SearchType } from '../../../../store/slices/User/types';
import { InputKeyboardEvent, InputChangeEvent } from '../../types';

export type FormProps = {
  children: ReactElement;
  query: string;
  isDisabled: boolean;
  searchTypes: SearchType[];
  onInputKeyPress: (event: InputKeyboardEvent) => void;
  onInputChange: (event: InputChangeEvent) => void;
  onClearQuery: () => void;
  onSubmitQuery: () => void;
  onClearSearchTypes: () => void;
};
