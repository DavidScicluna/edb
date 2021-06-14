import { IconButtonProps as CUIIconButtonProps } from '@chakra-ui/react';

import { Icon } from '../../../common/types/types';
import { Color } from '../../../theme/types';

type Variant = 'icon' | 'outlined' | 'contained';

export type IconButtonProps = { color?: Color; icon: Icon; variant?: Variant } & Omit<
  CUIIconButtonProps,
  'color' | 'colorScheme' | 'icon' | 'isActive' | 'isRound' | 'spinner' | 'variant'
>;
