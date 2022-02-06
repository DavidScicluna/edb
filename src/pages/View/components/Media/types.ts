import { MediaType, Image, Video } from '../../../../common/types';
import { AssetType } from '../../../../components/MediaViewer/types';

export type Status = {
  images?: boolean;
  videos?: boolean;
};

export type MediaProps = {
  alt?: string;
  posters?: Image[];
  backdrops?: Image[];
  videos?: Video[];
  mediaType: Omit<MediaType, 'company' | 'collection'>;
  isError: Status;
  isSuccess: Status;
  isLoading: Status;
  onAssetClick: (path: string, type: AssetType) => void;
  onFooterClick: () => void;
};
