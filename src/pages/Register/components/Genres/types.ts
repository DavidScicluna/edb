import { UseFormReturn } from 'react-hook-form';

import { ColorMode } from '@chakra-ui/react';

import { Color } from '../../../../theme/types';
import { GenresForm } from '../../types';

export type GenresProps = {
	form: UseFormReturn<GenresForm>;
	color: keyof Omit<Color, 'gray' | 'red' | 'green' | 'yellow'>;
	colorMode: ColorMode;
};
