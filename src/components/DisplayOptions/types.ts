import { SortBy as SortByType } from '../../common/types/types';

export type DisplayOptionsProps = {
  sortBy?: SortByType[];
  onSortChange?: (sortBy: SortByType) => void;
};
