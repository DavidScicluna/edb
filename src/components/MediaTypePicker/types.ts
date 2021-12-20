import { MediaType, Icon } from '../../common/types';

export type MediaTypeItem = {
  label: string;
  value: MediaType;
  iconActive: Icon;
  icon: Icon;
};

export type MediaTypePickerProps<MT> = {
  mediaTypes?: MediaType[];
  mediaType: MT | null;
  isOpen: boolean;
  onClose: () => void;
  onSetType: (mediaType: MediaType) => void;
};
