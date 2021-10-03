import { MediaType } from '../../../../../../../common/types/types';
import { MediaViewerType } from '../../../../../../../components/MediaViewer/types';

export type PosterProps = {
  name: string;
  path: string;
  mediaType: MediaType;
  isLoading: boolean;
  onClickPoster: (path: string, type: MediaViewerType) => void;
};
