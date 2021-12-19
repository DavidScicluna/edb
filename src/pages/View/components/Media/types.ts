import { ImageResponse as Image, Video } from '../../../../common/types';
import { MediaViewerType } from '../../../../components/MediaViewer/types';

export type Status = {
  images?: boolean;
  videos?: boolean;
};

export type MediaProps = {
  title?: string;
  photos?: Image[];
  backdrops?: Image[];
  videos?: Video[];
  isError: Status;
  isSuccess: Status;
  isLoading: Status;
  onClick: (asset: string, type: MediaViewerType) => void;
};
