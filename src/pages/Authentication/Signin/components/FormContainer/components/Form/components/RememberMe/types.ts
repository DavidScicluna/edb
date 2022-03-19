import { FormProps } from '../../types';

export type RememberMeProps = Omit<FormProps, 'onSubmit' | 'onChange'>;
