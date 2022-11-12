import { UseFormReturn } from 'react-hook-form';

import { RegisterCommonProps } from '../../common/types';
import { CustomizationForm } from '../../types';

export type CustomizationStepProps = RegisterCommonProps & {
	form: UseFormReturn<CustomizationForm>;
};
