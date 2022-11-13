import { UseFormReturn } from 'react-hook-form';

import { DetailsForm, ProfileForm } from '../../types';

export type ProfileProps = Pick<DetailsForm, 'firstName' | 'lastName' | 'username'> & {
	form: UseFormReturn<ProfileForm>;
};
