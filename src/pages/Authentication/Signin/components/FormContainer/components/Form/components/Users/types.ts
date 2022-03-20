import { FormProps } from '../../types';

export type UsersProps = Omit<FormProps, 'form' | 'onSubmit' | 'onChange'>;
