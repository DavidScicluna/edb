import { MediaViewerType } from '../../../../../../components/MediaViewer/types';

export type BackdropProps = {
  title?: string;
  path?: string | null;
  video?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onClick: (path: string, type: MediaViewerType) => void;
};
