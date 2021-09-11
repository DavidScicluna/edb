import { MediaType, SortBy, Genre } from '../../../../common/types/types';
import { List, MediaItem } from '../../../../store/slices/User/types';

export type ActionsProps = {
  mediaType: MediaType | null;
  lists: List[];
  list: List | null;
  movies: MediaItem<'movie'>[];
  tv: MediaItem<'tv'>[];
  onFilter: (sortBy: SortBy[], genres: Genre[]) => void;
  onMediaTypePickerOpen: () => void;
  onListPickerOpen: () => void;
  onListInfoOpen: () => void;
  onCreateListOpen: () => void;
};
