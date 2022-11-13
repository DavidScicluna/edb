import { CommonUpdateUserAssetsProps } from '../../common/types';
import { UpdateUserAssetsProps } from '../../types';

export type UserAvatarProps = Pick<UpdateUserAssetsProps, 'form' | 'color' | 'colorMode'> & CommonUpdateUserAssetsProps;
