import { Image } from '../../../../../../../../common/types';
import { PhotosTabProps } from '../../types';

export type PhotoProps = {
  file_path?: Image['file_path'];
  isLoading: boolean;
  onClickImage?: (path: string) => void;
} & Omit<PhotosTabProps, 'images' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickImage'>;
