import { ChangeEvent as CE } from 'react';

import { UseFormReturn } from 'react-hook-form';

import { RegisterCommonProps } from '../../common/types';
import { DetailsForm, ProfileForm } from '../../types';

export type FileInputRef = HTMLInputElement | null;

export type ChangeEvent = CE<HTMLInputElement>;

export type ProfileProps = RegisterCommonProps & {
	form: UseFormReturn<ProfileForm>;
} & Pick<DetailsForm, 'firstName' | 'lastName' | 'username'>;
