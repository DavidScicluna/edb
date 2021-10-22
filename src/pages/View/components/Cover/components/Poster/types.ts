import { MediaViewerType } from '../../../../../../components/MediaViewer/types';

export type PosterProps = {
  title?: string;
  path?: string | null;
  isLoading?: boolean;
  isError?: boolean;
  onClick: (path: string, type: MediaViewerType) => void;
};
