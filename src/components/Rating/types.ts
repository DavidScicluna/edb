import { Rating } from '../../common/types/types';

export type RatingProps = {
  rating?: Rating;
  isLoaded: boolean;
  type?: 'horizontal' | 'vertical';
};
