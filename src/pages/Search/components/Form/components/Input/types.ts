import { SearchType } from '../../../../../../store/slices/User/types';
import { InputKeyboardEvent, InputChangeEvent } from '../../../../types';

export type InputProps = {
  query: string;
  isDisabled: boolean;
  searchTypes: SearchType[];
  onInputKeyPress: (event: InputKeyboardEvent) => void;
  onInputChange: (event: InputChangeEvent) => void;
  onClearQuery: () => void;
  onSubmitQuery: () => void;
  onClearSearchTypes?: () => void;
};
