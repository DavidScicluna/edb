import { UseFormReturn } from 'react-hook-form';

import { RegisterCommonProps } from '../../common/types';
import { DetailsForm } from '../../types';

export type DetailsStepProps = RegisterCommonProps & {
	form: UseFormReturn<DetailsForm>;
};
