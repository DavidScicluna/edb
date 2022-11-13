import { UserUpdateAssetsCommonProps } from '../../common/types';
import { UserUpdateAssetsProps } from '../../types';

export type UserAvatarProps = Pick<UserUpdateAssetsProps, 'form' | 'color' | 'colorMode'> & UserUpdateAssetsCommonProps;
