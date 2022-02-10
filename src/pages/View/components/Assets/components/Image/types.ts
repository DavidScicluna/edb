import { Image } from '../../../../../../common/types';
import { AssetsTabProps } from '../../types';

export type AssetImageProps = Image & {
  srcSize: [string, string];
  isLoading?: boolean;
  onClickImage?: (path: string) => void;
} & Omit<AssetsTabProps, 'images' | 'isError' | 'isSuccess' | 'isLoading' | 'onClickImage'>;
