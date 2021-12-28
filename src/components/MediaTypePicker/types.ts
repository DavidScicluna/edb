import { ReactElement } from 'react';

import { MediaType, Icon } from '../../common/types';
import { Color } from '../../theme/types';

export type RenderToggleModalProps = {
  color: keyof Color;
  label: string;
  icon?: Icon;
  onClick: () => void;
};

export type MediaTypePickerProps<MT extends MediaType> = {
  renderToggleModal: (props: RenderToggleModalProps) => ReactElement;
  mediaTypes?: MediaType[];
  mediaType?: MT;
  onSetType: (mediaType: MediaType) => void;
};
