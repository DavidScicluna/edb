import { SortBy } from '../../../../../../common/types';
import { SortDirection } from '../../../../../../store/slices/App/types';

export type SortByItemProps = {
  direction: SortDirection;
  onSortChange: (sortBy: SortBy) => void;
  onDirectionChange: (direction: SortDirection) => void;
} & SortBy;
