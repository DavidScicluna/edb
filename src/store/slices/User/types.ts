type SearchType = 'isTrending' | 'isKeyword';

import { MediaType } from '../../../common/types/types';

export type Search = {
  id: string;
  label: string;
  date: string;
  type?: SearchType;
  mediaType?: MediaType;
};

export type StateProps = {
  data: {
    recentSearches: Search[];
  };
};
