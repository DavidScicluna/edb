import { UserUpdateAssetsCommonProps } from '../../common/types';
import { UserUpdateAssetsProps } from '../../types';

export type UserBackgroundProps = Pick<UserUpdateAssetsProps, 'form' | 'color' | 'colorMode'> &
	UserUpdateAssetsCommonProps;
