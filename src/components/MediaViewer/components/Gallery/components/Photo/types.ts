import { ImageResponse as Image, MediaType } from '../../../../../../common/types';
import { MediaViewerType } from '../../../../types';

export type PhotoProps = {
  photo: Image;
  name?: string;
  type: MediaViewerType;
  mediaType: MediaType;
  isActive?: boolean;
  onClickImage: (path: string, type: MediaViewerType) => void;
};
