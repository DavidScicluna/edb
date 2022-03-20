import { FormProps } from '../../types';

export type RememberMeProps = Omit<FormProps, 'users' | 'onSubmit' | 'onChange' | 'onUserClick'>;
