import { Video } from '../../../../../../common/types';
import { MediaViewerType } from '../../../../types';

export type VideoProps = {
  video: Video;
  isActive?: boolean;
  onClickVideo: (path: string, type: MediaViewerType) => void;
};
