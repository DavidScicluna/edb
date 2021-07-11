import { Form } from '../../../../types';
import { DisplayMode } from '../../types';

export type DisplayModeItemProps = {
  isActive?: boolean;
  onClick?: (mode: Form['displayMode']) => void;
} & DisplayMode;
