import { SortBy } from '../types/types';

export const onSortChange = (paramSort: SortBy, sortBy: SortBy[]): SortBy[] => {
  const current: number = sortBy.findIndex((sort) => sort.isActive);
  const next: number = sortBy.findIndex((sort) => sort.value === paramSort.value);

  return sortBy.map((sort, index) => {
    switch (index) {
      case current:
        return {
          ...sort,
          isActive: false
        };
      case next:
        return {
          ...sort,
          isActive: true
        };
      default:
        return sort;
    }
  });
};
