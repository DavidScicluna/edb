import { ButtonSize, MediaType } from '../../../../common/types/types';
import { VerticalPosterProps } from '../../Vertical/types';

export type PosterBookmarkProps<MT extends MediaType> = {
  size: ButtonSize;
} & Omit<VerticalPosterProps<MT>, 'width' | 'image' | 'rating' | 'subtitle'>;
