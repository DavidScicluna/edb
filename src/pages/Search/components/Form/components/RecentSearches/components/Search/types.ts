import { Search, SearchType } from '../../../../../../../../store/slices/User/types';

export type SearchProps = {
  onDelete: (id: Search['id']) => void;
  onClick: (label: Search['label'], searchTypes?: SearchType[]) => void;
} & Search;
