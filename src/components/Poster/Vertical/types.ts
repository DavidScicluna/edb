import { MediaType, Image as ImageProps, Rating as RatingProps } from '../../../common/types/types';

export type VerticalPosterProps = {
  width: string | string[];
  mediaType: MediaType;
  image: ImageProps;
  rating?: RatingProps;
  title: string;
  subtitle: string;
  isLoaded: boolean;
};
