import { MediaType } from '../../common/types/types';
import { GetMediaType } from '../../store/slices/User/types';
import { IconButtonProps } from '../Clickable/IconButton/types';

export interface LikeProps {
  isDisabled: boolean;
  title: string;
  mediaType: MediaType;
  mediaItem: GetMediaType<this['mediaType']>;
  size: IconButtonProps['size'];
}
