import { ColorMode } from '@chakra-ui/react';

import { Form } from '../../../../types';
import { Background } from '../../types';

export type BackgroundItemProps = {
  color: Form['color'];
  background: ColorMode;
  isActive?: boolean;
  onClick?: (background: Background['value']) => void;
} & Background;
