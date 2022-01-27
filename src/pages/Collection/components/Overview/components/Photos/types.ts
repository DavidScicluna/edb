import { Image } from '../../../../../../common/types';
import { MediaViewerType } from '../../../../../../components/MediaViewer/types';

export type MediaTypes<T> = {
  photos: T;
  backdrops: T;
};

export type PhotosProps = {
  data: MediaTypes<Image[]>;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  onClickImage: (asset: string, type: MediaViewerType) => void;
};
