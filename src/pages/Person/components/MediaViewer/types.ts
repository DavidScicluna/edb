import { Image } from '../../../../common/types/person';

export type NavigationDirection = 'prev' | 'next';

export type MediaViewerProps = {
  isOpen: boolean;
  name?: string;
  selectedImage: Image | undefined;
  images: Image[];
  onClose: () => void;
};
