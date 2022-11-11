import { UseFormReturn } from 'react-hook-form';

import { EditUserCommonProps } from '../../common/types';
import { EditUserDetailsForm, EditUserAssetsForm } from '../../types';

export type AssetsTabProps = EditUserCommonProps & {
	form: UseFormReturn<EditUserAssetsForm>;
	onSubmit: (values: EditUserAssetsForm) => void;
} & Pick<EditUserDetailsForm, 'firstName' | 'lastName'>;
