import { UseFormReturn } from 'react-hook-form';

import { RegisterDetailsForm, RegisterAssetsForm } from '../../types';

export type AssetsStepProps = Pick<RegisterDetailsForm, 'firstName' | 'lastName' | 'username'> & {
	form: UseFormReturn<RegisterAssetsForm>;
};
