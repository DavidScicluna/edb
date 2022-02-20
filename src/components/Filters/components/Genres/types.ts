import { UseFormReturn } from 'react-hook-form';

import { MediaType } from '../../../../common/types';
import { Form } from '../../types';

export type GenresProps = {
	form: UseFormReturn<Form>;
	mediaType: Omit<MediaType, 'person' | 'collection' | 'company'>;
};
