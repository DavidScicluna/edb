import { Form } from '../../../../types';
import { Background } from '../../types';

export type BackgroundItemProps = {
  color: Form['color'];
  background: Form['background'];
  isActive?: boolean;
  onClick?: (background: Background['value']) => void;
} & Background;
