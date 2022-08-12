import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';

import { AuthenticationForm } from '../../common/types';

export type PasswordProps = {
	field: ControllerRenderProps<AuthenticationForm, 'password'>;
	fieldState: ControllerFieldState;
	label?: string;
};
