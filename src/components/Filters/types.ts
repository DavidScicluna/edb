import { Department } from '../../common/data/departments';
import { MediaType, SortBy, Genre } from '../../common/types/types';
import { DisplayMode, SortDirection } from '../../store/slices/App/types';

export type FiltersProps = {
  mediaType: MediaType;
  isLikedLists?: boolean;
  isDisabled?: boolean;
  onFilter: (sortBy: SortBy[], genres: Genre[], departments: Department[]) => void;
};

export type Form = {
  displayMode: DisplayMode;
  sort: {
    sortBy: SortBy[];
    direction: SortDirection;
  };
  genres: Genre[];
  departments: Department[];
};
