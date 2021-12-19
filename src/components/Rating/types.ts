import { Rating } from '../../common/types';

export type RatingProps = {
  rating?: Rating;
  isLoading: boolean;
  iconFontsize?: string;
  textFontsize?: string | string[];
};
