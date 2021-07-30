import { MediaType, Image as ImageProps, Rating as RatingProps } from '../../../common/types/types';
import { MediaItem } from '../../../store/slices/User/types';

export type HorizontalPosterProps<MT extends MediaType> = {
  mediaItem?: MediaItem<MT>;
  mediaType: MediaType;
  image: ImageProps;
  rating?: RatingProps;
  title: string;
  subtitle: string;
  description: string;
  isLoading: boolean;
};
