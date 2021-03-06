import { MediaType } from '../../common/types/types';
import { IconButtonProps } from '../Clickable/IconButton/types';

export type BookmarkProps = {
  isDisabled: boolean;
  mediaItem: {
    id: number;
    title: string | null;
    mediaType: MediaType;
  };
  size: IconButtonProps['size'];
};
