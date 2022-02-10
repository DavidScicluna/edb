import { MediaType } from '../../../../../../../common/types';

export type PosterProps = {
  alt?: string;
  path?: string;
  mediaType: MediaType;
  srcSize: [string, string];
  isLoading: boolean;
  onClickPoster: (path: string) => void;
};
