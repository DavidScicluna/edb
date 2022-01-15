import { ReactElement, useContext } from 'react';

import { TabPanels as CUITabPanels, TabPanel, ScaleFade } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

import { TabsContext } from '../../.';
import { TabsContext as TabsContextType } from '../../types';
import { TabPanelsProps } from './types';

const TabPanels = ({ children }: TabPanelsProps): ReactElement => {
  const { activeTab } = useContext<TabsContextType>(TabsContext);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <CUITabPanels>
        {children.map((panel, index) => (
          <TabPanel key={index} as={ScaleFade} in={activeTab === index} p={0}>
            {panel}
          </TabPanel>
        ))}
      </CUITabPanels>
    </AnimatePresence>
  );
};

export default TabPanels;
