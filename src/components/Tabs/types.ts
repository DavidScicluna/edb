import { ReactElement } from 'react';

import { TabsProps as CUITabsProps } from '@chakra-ui/react';

export type TabsProps = {
  children: ReactElement | ReactElement[];
  activeTab: number;
  onChange: (index: number) => void;
} & CUITabsProps;
