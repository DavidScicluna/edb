import { SortBy as SortByType } from '../../../../common/types/types';

export type SortByProps = {
  sortBy: SortByType[];
  onSortChange: (sortBy: SortByType) => void;
};
