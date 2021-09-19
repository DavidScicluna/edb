import { ButtonSize, MediaType } from '../../../../common/types/types';
import { MediaItem } from '../../../../store/slices/User/types';

export type PosterLikeProps<MT extends MediaType> = {
  mediaItem?: MediaItem<MT>;
  mediaType: MediaType;
  title: string;
  isLoading: boolean;
  size: ButtonSize;
};
