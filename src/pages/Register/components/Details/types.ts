import { UseFormReturn } from 'react-hook-form';

import { ColorMode } from '@chakra-ui/react';

import { Color } from '../../../../theme/types';
import { DetailsForm } from '../../types';

export type DetailsProps = {
	form: UseFormReturn<DetailsForm>;
	color: keyof Omit<Color, 'gray' | 'red' | 'green' | 'yellow'>;
	colorMode: ColorMode;
};
