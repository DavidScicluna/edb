import { Genre } from '../../../../../../store/slices/Options/types';

export type GenreProps = {
  isActive?: boolean;
  isLoading?: boolean;
  onClick?: (genre: Genre) => void;
} & Partial<Genre>;
