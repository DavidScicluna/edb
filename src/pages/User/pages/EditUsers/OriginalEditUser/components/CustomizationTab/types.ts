import { UseFormReturn } from 'react-hook-form';

import { EditUserCommonProps } from '../../common/types';
import { EditUserCustomizationForm } from '../../types';

export type CustomizationTabProps = EditUserCommonProps & {
	defaultUserTheme: EditUserCustomizationForm;
	form: UseFormReturn<EditUserCustomizationForm>;
	onSubmit: (values: EditUserCustomizationForm) => void;
};
