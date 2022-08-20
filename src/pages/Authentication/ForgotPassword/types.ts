import { AuthenticationForm } from '../common/types';

export type Form = AuthenticationForm & {
	newPassword: string;
	confirmNewPassword: string;
};
