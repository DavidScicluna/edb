import { MediaType, Image as ImageProps, Rating as RatingProps } from '../../../common/types/types';
import { MediaItem } from '../../../store/slices/User/types';

export type VerticalPosterProps<MT extends MediaType> = {
  width: string | string[];
  mediaItem?: MediaItem<MT>;
  mediaType: MediaType;
  image?: ImageProps;
  rating?: RatingProps;
  title: string;
  subtitle: string;
  isLoading: boolean;
};
