import { AuthenticationForm } from '../common/types';

export type Params = { username?: string };

export type Form = AuthenticationForm & {
	newPassword: string;
	confirmNewPassword: string;
};
