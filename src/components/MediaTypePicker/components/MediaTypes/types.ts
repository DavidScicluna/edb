import { MediaTypePickerProps } from '../../types';

export type MediaTypesProps<MT> = {
  onClose?: () => void;
} & Omit<MediaTypePickerProps<MT>, 'isOpen' | 'onClose'>;
