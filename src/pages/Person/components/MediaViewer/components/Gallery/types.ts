import { Image } from '../../../../../../common/types/person';

export type GalleryProps = {
  isOpen: boolean;
  name?: string;
  activeIndex: number;
  images: Image[];
  onClick: (index: number) => void;
  onClose: () => void;
};
