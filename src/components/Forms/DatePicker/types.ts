import { ReactElement } from 'react';

import { Props } from 'dayzed';

import { Icon } from '../../../common/types';
import { Color } from '../../../theme/types';

export type RenderToggleModalProps = {
  color: keyof Color;
  icon: Icon;
  onClick: () => void;
};

export type DatePickerProps = {
  renderToggleModal: (props: RenderToggleModalProps) => ReactElement;
  color: keyof Color;
  onSetDate: (date: Date) => void;
  value?: Date;
} & Omit<Props, 'children' | 'render' | 'monthsToDisplay' | 'selected' | 'onDateSelected'>;
