

export type HTMLFullscreenElement = any & HTMLElement;

export type FullscreenDocument = any & HTMLDocument;

export type ActionsProps = {
  hasFullscreen?: boolean;
  onClose: () => void;
  onGalleryClick: () => void;
};
