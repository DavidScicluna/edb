import { ReactElement, createContext } from 'react';

import { Tabs as CUITabs } from '@chakra-ui/react';

import { TabsContext as TabsContextType, TabsProps } from './types';

export const TabsContext = createContext<TabsContextType>({ activeTab: -1 });

const Tabs = (props: TabsProps): ReactElement => {
  const { children, activeTab = -1, ...rest } = props;

  return (
    <CUITabs
      {...rest}
      width='100%'
      maxWidth='100%'
      activeTab={activeTab}
      index={activeTab}
      isLazy
      lazyBehavior='unmount'
      variant='unstyled'
    >
      <TabsContext.Provider value={{ activeTab }}>{children}</TabsContext.Provider>
    </CUITabs>
  );
};

export default Tabs;
