import { ReactElement } from 'react';

import { MediaType, Image as ImageProps, Rating as RatingProps } from '../../../common/types';
import { MediaItem } from '../../../store/slices/User/types';

export type HorizontalPosterProps<MT extends MediaType> = {
  mediaItem?: MediaItem<MT>;
  mediaType: MediaType;
  image?: ImageProps;
  rating?: RatingProps;
  title: string;
  subtitle: string;
  description: string | ReactElement;
  isLoading: boolean;
};
