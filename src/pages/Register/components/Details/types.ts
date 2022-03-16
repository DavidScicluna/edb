import { UseFormReturn } from 'react-hook-form';

import { ColorMode } from '@chakra-ui/react';

import { DetailsForm, CustomizationForm } from '../../types';

export type DetailsProps = {
	form: UseFormReturn<DetailsForm>;
	colorMode: ColorMode;
} & Omit<CustomizationForm, 'colorMode'>;