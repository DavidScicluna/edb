import { UseFormReturn } from 'react-hook-form';

import { RegisterCommonProps } from '../../common/types';
import { DetailsForm } from '../../types';

export type DetailsProps = RegisterCommonProps & {
	form: UseFormReturn<DetailsForm>;
};
