import { Type } from '../../common/types/types';
import { IconButtonProps } from '../Inputs/IconButton/types';

export type BookmarkProps = {
  isBookmarked: boolean;
  isDisabled: boolean;
  title: string | null;
  type: Type;
  size?: IconButtonProps['size'];
  bookmark?: string; // TODO: Change type to bookmark once bookmark logic is implemented
};
