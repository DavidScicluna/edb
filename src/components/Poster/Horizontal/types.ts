import { MediaType, Image as ImageProps, Rating as RatingProps } from '../../../common/types/types';

export type HorizontalPosterProps = {
  mediaItemID: number;
  mediaType: MediaType;
  image: ImageProps;
  rating?: RatingProps;
  title: string;
  subtitle: string;
  description: string;
  isLoaded: boolean;
};
