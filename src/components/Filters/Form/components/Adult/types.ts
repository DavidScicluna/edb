import { UseFormReturn } from 'react-hook-form';

import { MediaType } from '../../../../../common/types';
import { Filters } from '../../../types';

export type AdultProps = {
	form: UseFormReturn<Filters>;
	mediaType: Omit<MediaType, 'person'>;
};
