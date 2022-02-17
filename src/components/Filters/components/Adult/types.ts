import { UseFormReturn } from 'react-hook-form';

import { MediaType } from '../../../../common/types';
import { Form } from '../../types';

export type AdultProps = {
	form: UseFormReturn<Form>;
	mediaType: Omit<MediaType, 'person'>;
};
