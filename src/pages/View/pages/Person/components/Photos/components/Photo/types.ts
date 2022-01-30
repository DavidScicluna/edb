import { Image } from '../../../../../../../../common/types';
import { PhotosProps } from '../../types';

export type PhotoProps = {
  file_path?: Image['file_path'];
  onClickImage?: (path: string) => void;
} & Omit<PhotosProps, 'images' | 'isError' | 'isSuccess' | 'onClickImage'>;
