import { Rating } from '../../common/types/types';

export type RatingProps = {
  rating?: Rating;
  isLoading: boolean;
  iconFontsize?: string;
  textFontsize?: string | string[];
};
