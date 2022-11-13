import { AuthenticationForm } from '../../common/types';

export type ResetPasswordForm = AuthenticationForm & {
	newPassword: string;
	confirmNewPassword: string;
};
