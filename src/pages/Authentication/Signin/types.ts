import { AuthenticationForm } from '../common/types';

export type Form = AuthenticationForm & {
	rememberMe: boolean;
};
