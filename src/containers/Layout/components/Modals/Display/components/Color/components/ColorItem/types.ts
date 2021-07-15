import { Form } from '../../../../types';
import { Color } from '../../types';

export type ColorItemProps = {
  background: Form['background'];
  isActive?: boolean;
  onClick?: (color: Color['value']) => void;
} & Color;
