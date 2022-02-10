import { Image } from '../../../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type AssetImageProps = Image & {
  srcSize: [string, string];
  onClickImage?: (path: string) => void;
} & Omit<AssetsTabProps, 'images' | 'isError' | 'isSuccess' | 'onClickImage'>;
