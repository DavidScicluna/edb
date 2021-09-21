import { VideoResponse as Video } from '../../../../../../common/types/types';
import { MediaViewerType } from '../../../../types';

export type VideoProps = {
  video: Video;
  isActive?: boolean;
  onClickVideo: (path: string, type: MediaViewerType) => void;
};
