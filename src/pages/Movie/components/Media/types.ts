import { ImageResponse as Image, VideoResponse as Video } from '../../../../common/types/types';
import { MediaViewerType } from '../../../../components/MediaViewer/types';

type Status = {
  images?: boolean;
  videos?: boolean;
};

export type MediaProps = {
  name?: string;
  photos?: Image[];
  backdrops?: Image[];
  videos?: Video[];
  isError: Status;
  isSuccess: Status;
  isLoading: Status;
  onClick: (asset: string, type: MediaViewerType) => void;
};
