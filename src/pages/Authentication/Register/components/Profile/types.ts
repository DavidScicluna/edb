import { UseFormReturn } from 'react-hook-form';

import { ColorMode } from '@chakra-ui/react';

import { DetailsForm, ProfileForm, CustomizationForm } from '../../types';

export type ProfileProps = {
	id: string;
	form: UseFormReturn<ProfileForm>;
	user: DetailsForm;
	colorMode: ColorMode;
	onChange: () => void;
} & Omit<CustomizationForm, 'colorMode'>;
