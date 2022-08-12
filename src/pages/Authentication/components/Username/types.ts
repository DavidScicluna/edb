import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';

import { AuthenticationForm } from '../../common/types';

export type UsernameProps = {
	field: ControllerRenderProps<AuthenticationForm, 'username'>;
	fieldState: ControllerFieldState;
};
