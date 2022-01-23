import { ReactElement } from 'react';

import { ListItemProps as CUIListItemProps } from '@chakra-ui/react';

export type Variant = 'transparent' | 'contained';

export type ListItemProps = {
  title: string;
  subtitle?: string;
  badge?: ReactElement;
  actions?: ReactElement;
  isLoading?: boolean;
  variant?: Variant;
} & CUIListItemProps;
