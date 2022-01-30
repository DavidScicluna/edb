import { MediaType } from '../../../../../common/types';
import { HorizontalPosterProps } from '../../types';

export type PosterImageProps<MT extends MediaType> = {
  isHovering: boolean;
  inView: boolean;
  onMouseChange: (bool: boolean) => void;
} & Omit<HorizontalPosterProps<MT>, 'rating' | 'subtitle' | 'description'>;
