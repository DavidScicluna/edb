import { UseFormReturn } from 'react-hook-form';

import { UserTheme } from '../../../../store/slices/Users/types';

export type Form = UserTheme;

export type UserThemeCustomizationProps = { form: UseFormReturn<Form> } & UserTheme;
