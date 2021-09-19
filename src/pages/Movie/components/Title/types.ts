import { ReleaseDates } from '../../../../common/types/movie';
import { Genre, Rating } from '../../../../common/types/types';

export type TitleProps = {
  title?: string;
  rating?: Rating;
  release_date?: string;
  genres?: Genre[];
  certification?: ReleaseDates;
  runtime?: number | null;
  isLoading?: boolean;
};
