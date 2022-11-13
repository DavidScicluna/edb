import { AuthenticationForm } from '../../common/types';

export type SigninForm = AuthenticationForm & {
	rememberMe: boolean;
};
