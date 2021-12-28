import { UseFormReturn } from 'react-hook-form';

import { Form, SortBy } from '../../types';

export type SortProps = {
  form: UseFormReturn<Form>;
  sortBy: SortBy[];
};
