import { Genre } from '../../../../../../common/types/types';

export type GenreProps = {
  isActive: boolean;
  onClick: (genre: Genre) => void;
} & Genre;
