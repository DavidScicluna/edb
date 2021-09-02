import { Profile } from '../../../../../../common/types/person';

export type GalleryProps = {
  isOpen: boolean;
  name?: string;
  activeIndex: number;
  images: Profile[];
  onClick: (index: number) => void;
  onClose: () => void;
};
