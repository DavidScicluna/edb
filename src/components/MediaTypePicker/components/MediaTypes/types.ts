import { MediaTypePickerProps } from '../../types';

export type MediaTypesProps<MT> = Omit<MediaTypePickerProps<MT>, 'isOpen' | 'onClose'>;
