import { ReactElement } from 'react';

import { LinkProps as CUILinkProps } from '@chakra-ui/react';
import { Location } from 'history';

export type LinkProps = {
  children: ReactElement;
  to: Partial<Location>;
  isFullWidth?: boolean;
  isDisabled?: boolean;
} & Omit<CUILinkProps, 'colorScheme' | 'href' | 'target' | 'isExternal' | 'size' | 'variant'>;
