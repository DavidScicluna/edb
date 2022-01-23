import { SearchType } from '../../../../../../store/slices/User/types';

export type SearchTypesProps = {
  searchTypes: SearchType[];
  onClear: () => void;
};
