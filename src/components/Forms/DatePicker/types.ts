import { ReactElement } from 'react';

import { Props } from 'dayzed';

import { Icon } from '../../../common/types';
import { Color } from '../../../theme/types';

export type Size = 'sm' | 'md' | 'lg';

export type RenderToggleModalProps = {
  color: keyof Color;
  icon: Icon;
  onClick: () => void;
};

export type DatePickerProps = {
  renderToggleModal: (props: RenderToggleModalProps) => ReactElement;
  color: keyof Color;
  // colorMode?: ColorMode;
  // label?: string;
  // isDisabled?: boolean;
  // isFullWidth?: boolean;
  // size?: Size;
  // sx?: {
  //   input?: CUIInputProps['sx'];
  //   formLabel?: CUIInputProps['sx'];
  //   formHelperText?: CUIInputProps['sx'];
  // };
} & Omit<Props, 'children' | 'render'>;
