import { Profile } from '../../../../common/types/person';

export type NavigationDirection = 'prev' | 'next';

export type MediaViewerProps = {
  isOpen: boolean;
  name?: string;
  selectedImage: Profile | undefined;
  images: Profile[];
  onClose: () => void;
};
