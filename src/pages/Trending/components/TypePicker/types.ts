import { MediaType, Icon } from '../../../../common/types/types';

export type TypeItem = {
  label: string;
  value: MediaType;
  iconActive: Icon;
  icon: Icon;
};

export type TypePickerProps = {
  mediaType: MediaType | null;
  isOpen: boolean;
  onClose: () => void;
  onSetType: (mediaType: MediaType) => void;
};
