import { Genre, MediaType, Rating } from '../../../../common/types/types';

export type TitleProps = {
  mediaType: MediaType;
  title?: string;
  rating?: Rating;
  date?: string;
  genres?: Genre[];
  certification?: string;
  runtime?: number | null;
  isLoading?: boolean;
};
