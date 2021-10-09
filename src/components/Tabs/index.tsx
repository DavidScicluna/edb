import React, { ReactElement } from 'react';

import { Tabs as CUITabs } from '@chakra-ui/react';

import { TabsProps } from './types';

const Tabs = (props: TabsProps): ReactElement => {
  const { children, activeTab, onChange } = props;

  return (
    <CUITabs index={activeTab} onChange={onChange} variant='unstyled' isLazy p={2}>
      {children}
    </CUITabs>
  );
};

export default Tabs;
