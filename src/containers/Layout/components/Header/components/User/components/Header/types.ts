import { Credentials, Info } from '../../../../../../../../store/slices/Users/types';

export type HeaderProps = Omit<Credentials, 'password' | 'rememberMe'> &
	Omit<Info, 'bio' | 'background_path' | 'prefers'>;
