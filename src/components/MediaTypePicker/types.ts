import { MediaType, Icon } from '../../common/types/types';

export type MediaTypeItem = {
  label: string;
  value: MediaType;
  iconActive: Icon;
  icon: Icon;
};

export type MediaTypePickerProps = {
  mediaType: MediaType | null;
  isOpen: boolean;
  onClose: () => void;
  onSetType: (mediaType: MediaType) => void;
};
