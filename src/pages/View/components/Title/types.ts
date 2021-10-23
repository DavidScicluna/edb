import { Genre, Rating } from '../../../../common/types/types';

export type TitleProps = {
  title?: string;
  rating?: Rating;
  date?: string;
  genres?: Genre[];
  certification?: string;
  runtime?: number | null;
  isLoading?: boolean;
};
