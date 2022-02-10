import { Image } from '../../../../common/types';
import { AssetType } from '../../../../components/MediaViewer/types';

type Booleans = {
  images?: boolean;
  videos?: boolean;
};

export type AssetsTabProps = {
  alt?: string;
  images: {
    profiles?: Image[];
    posters?: Image[];
    backdrops?: Image[];
  };
  isError: Booleans;
  isSuccess: Booleans;
  isLoading: Booleans;
  onClickImage: (path: string, type: AssetType) => void;
};
