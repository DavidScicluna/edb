import { UseFormReturn } from 'react-hook-form';

import { RegisterCommonProps } from '../../common/types';
import { GenresForm } from '../../types';

export type GenresStepProps = RegisterCommonProps & {
	form: UseFormReturn<GenresForm>;
};
