import { Image as ImageProps, Rating as RatingProps } from '../../../../../../../../../common/types/types';

export type EpisodeProps = {
  image?: ImageProps;
  rating?: RatingProps;
  name: string;
  date: string;
  overview: string;
  number?: number;
  isLoading: boolean;
};
