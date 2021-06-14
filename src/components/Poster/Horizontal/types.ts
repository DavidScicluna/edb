import { MediaType, Image as ImageProps, Rating as RatingProps } from '../../../common/types/types';

export type HorizontalPosterProps = {
  mediaType: MediaType;
  image: ImageProps;
  rating?: RatingProps;
  title: string;
  subtitle: string;
  description: string;
  isLoaded: boolean;
};
