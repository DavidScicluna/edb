import { MediaType } from '../../../../../../common/types/types';

export type RowProps = {
  id: string;
  title: string;
  subtitle?: string;
  mediaType?: MediaType;
  state?: 'default' | 'isLoaded' | 'isLoading' | 'isFocused';
  type?: 'default' | 'isKeyword';
  onSearch?: (query: string) => void;
};
