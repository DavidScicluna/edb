import { MediaType } from '../../../../common/types';
import { MediaItem } from '../../../../store/slices/User/types';
import { Size } from '../../../Clickable/IconButton/types';

export type PosterLikeProps<MT extends MediaType> = {
  mediaItem?: MediaItem<MT>;
  mediaType: MediaType;
  title: string;
  isLoading: boolean;
  size: Size;
};
