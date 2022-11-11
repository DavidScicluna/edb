import { UseFormReturn } from 'react-hook-form';

import { EditUserCommonProps } from '../../common/types';
import { EditUserGenresForm } from '../../types';

export type GenresTabProps = EditUserCommonProps & {
	form: UseFormReturn<EditUserGenresForm>;
	onSubmit: (values: EditUserGenresForm) => void;
};
