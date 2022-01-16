import { MediaType } from '../../../common/types';
import { MediaItem } from '../../../store/slices/User/types';
import { Image } from '../../Image/types';
import { Rating, Count } from '../../Rating/types';

export type HorizontalPosterProps<MT extends MediaType> = {
  mediaItem?: MediaItem<MT>;
  mediaType: MediaType;
  image?: Image;
  rating?: {
    rating: Rating;
    count: Count;
  };
  title: string;
  subtitle: string;
  description: string;
  isLoading: boolean;
};
