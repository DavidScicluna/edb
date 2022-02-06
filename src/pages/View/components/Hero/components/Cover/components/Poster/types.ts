import { MediaType } from '../../../../../../../../common/types';

export type PosterProps = {
  alt?: string;
  path?: string | null;
  mediaType: Omit<MediaType, 'company' | 'collection'>;
  isLoading?: boolean;
  isError?: boolean;
  onClick: (path: string) => void;
};
