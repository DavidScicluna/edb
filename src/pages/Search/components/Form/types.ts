import { UseQueryResult } from 'react-query';

import { MediaType } from '../../../../common/types/types';
import { InputKeyboardEvent, InputChangeEvent, Keyword, TotalResults } from '../../types';

export type FormProps = {
  query: string;
  mediaType?: MediaType;
  submittedQuery: string;
  keywords: UseQueryResult<Keyword[], unknown>;
  hasUnsubmitted: boolean;
  totalResults?: TotalResults;
  isInputDisabled: boolean;
  onInputKeyPress: (event: InputKeyboardEvent) => void;
  onInputChange: (event: InputChangeEvent) => void;
  onSubmitQuery: (query: string, mediaType?: MediaType) => void;
  onClearQuery: () => void;
};
