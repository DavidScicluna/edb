import { Image } from '../../../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type AssetImageProps = {
  file_path?: Image['file_path'];
  srcSize: [string, string];
  onClickImage?: (path: string) => void;
} & Omit<AssetsTabProps, 'images' | 'isError' | 'isSuccess' | 'onClickImage'>;
