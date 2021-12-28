import { MediaType } from '../../../../common/types';
import { MediaTypePickerProps } from '../../types';

export type MediaTypesProps<MT extends MediaType> = {
  onClose?: () => void;
} & Omit<MediaTypePickerProps<MT>, 'renderToggleModal'>;
