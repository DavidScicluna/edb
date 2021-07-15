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
  dateAdded: string;
};

export type ListModal = {
  open: boolean;
  item?: { title: string } & MediaItem;
};

export type DescriptionModal = {
  open: boolean;
  item?: { title: string; description: string };
};

export type List = {
  id: string;
  label: string;
  description?: string;
  date: string;
  results: MediaItem[];
};

export type Theme = {
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
    listsModal: ListModal;
    descriptionModal: DescriptionModal;
    isDisplayModalOpen: boolean;
    isSplashscreenOpen: boolean;
    theme: Theme;
  };
};
