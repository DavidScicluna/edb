import { UseFormReturn } from 'react-hook-form';

import { MediaType } from '../../../../common/types';
import { Form } from '../../types';

export type GenresProps = {
  mediaType: Omit<MediaType, 'person'>;
  form: UseFormReturn<Form>;
};
