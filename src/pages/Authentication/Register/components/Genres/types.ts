import { UseFormReturn } from 'react-hook-form';

import { ColorMode } from '@chakra-ui/react';

import { GenresForm, CustomizationForm } from '../../types';

export type GenresProps = {
	form: UseFormReturn<GenresForm>;
	colorMode: ColorMode;
} & Omit<CustomizationForm, 'colorMode'>;
