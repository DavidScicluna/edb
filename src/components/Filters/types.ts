import { MediaType, SortBy, Genre } from '../../common/types/types';
import { DisplayMode, SortDirection } from '../../store/slices/App/types';

export type FiltersProps = {
  mediaType: MediaType;
  onFilter: (sortBy: SortBy[], genres: Genre[]) => void;
};

export type Form = {
  displayMode: DisplayMode;
  sort: {
    sortBy: SortBy[];
    direction: SortDirection;
  };
  genres: Genre[];
};
