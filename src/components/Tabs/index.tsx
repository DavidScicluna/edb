import React, { ReactElement } from 'react';

import { Tabs as CUITabs } from '@chakra-ui/react';

import { TabsProps } from './types';

const Tabs = (props: TabsProps): ReactElement => {
  const { children, activeTab, onChange } = props;

  return (
    <CUITabs maxWidth='100%' index={activeTab} onChange={onChange} variant='unstyled' isLazy>
      {children}
    </CUITabs>
  );
};

export default Tabs;
