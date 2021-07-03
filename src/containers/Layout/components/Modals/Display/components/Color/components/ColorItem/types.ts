import { Color } from '../../types';

export type ColorItemProps = {
  isActive?: boolean;
  onClick?: (color: Color['value']) => void;
} & Color;
