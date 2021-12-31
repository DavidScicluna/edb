import { UseFormReturn } from 'react-hook-form';

import { Genre } from '../../../../common/types';
import { Form } from '../../types';

export type GenresProps = {
  genres?: Genre[];
  form: UseFormReturn<Form>;
  isLoading?: boolean;
  isError?: boolean;
};
