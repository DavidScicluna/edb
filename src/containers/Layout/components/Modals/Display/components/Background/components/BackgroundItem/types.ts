import { Form } from '../../../../types';
import { Background } from '../../types';

export type BackgroundItemProps = {
  color: Form['color'];
  isActive?: boolean;
  onClick?: (background: Background['value']) => void;
} & Background;
