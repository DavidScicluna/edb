import { MediaViewerType } from '../../types';

export type HTMLFullscreenElement = any & HTMLElement;

export type FullscreenDocument = any & HTMLDocument;

export type ActionsProps = {
  activeType?: MediaViewerType;
  onClose: () => void;
  onGalleryClick: () => void;
};
