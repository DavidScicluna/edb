import { MediaType } from '../../../../../../../common/types/types';

export type PosterProps = {
  name: string;
  path: string;
  mediaType: MediaType;
  isLoading: boolean;
  onClickPoster: (path: string) => void;
};
