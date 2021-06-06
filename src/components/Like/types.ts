import { Type } from '../../common/types/types';
import { IconButtonProps } from '../Inputs/IconButton/types';

export type LikeProps = {
  isLiked: boolean;
  isDisabled: boolean;
  title: string | null;
  type: Type;
  size?: IconButtonProps['size'];
};
