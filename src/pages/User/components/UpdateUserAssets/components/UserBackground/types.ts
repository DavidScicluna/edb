import { CommonUpdateUserAssetsProps } from '../../common/types';
import { UpdateUserAssetsProps } from '../../types';

export type UserBackgroundProps = Pick<UpdateUserAssetsProps, 'form' | 'color' | 'colorMode'> &
	CommonUpdateUserAssetsProps;
