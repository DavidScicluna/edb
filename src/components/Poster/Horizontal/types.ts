import { Type, Image as ImageProps, Rating as RatingProps } from '../../../common/types/types';

export type HorizontalPosterProps = {
  type: Type;
  image: ImageProps;
  rating?: RatingProps;
  title: string;
  subtitle: string;
  description: string;
  isLoaded: boolean;
};
