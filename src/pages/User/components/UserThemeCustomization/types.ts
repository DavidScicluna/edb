import { UseFormReturn } from 'react-hook-form';

import { UserTheme } from '../../../../store/slices/Users/types';

export type UserThemeCustomizationForm = UserTheme;

export type UserThemeCustomizationProps = { form: UseFormReturn<UserThemeCustomizationForm> } & UserTheme;
