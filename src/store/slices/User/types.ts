type SearchType = 'isTrending' | 'isKeyword';

import { MediaType } from '../../../common/types/types';
import { Color } from '../../../theme/types';

export type Search = {
  id: string;
  label: string;
  date: string;
  type?: SearchType;
  mediaType?: MediaType;
};

export type MediaItem = {
  id: number;
  mediaType: MediaType;
};

export type ListsModal = {
  open: boolean;
  item?: { title: string } & MediaItem;
};

export type List = {
  id: string;
  label: string;
  description?: string;
  date: string;
  results: MediaItem[];
};

export type Theme = {
  fontSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  color: Omit<Color, 'gray' | 'red'>;
  background: 'light' | 'dark';
};

export type StateProps = {
  data: {
    recentSearches: Search[];
    recentlyViewed: MediaItem[];
    liked: MediaItem[];
    lists: List[];
  };
  ui: {
    listsModal: ListsModal;
    isDisplayModalOpen: boolean;
    theme: Theme;
  };
};
