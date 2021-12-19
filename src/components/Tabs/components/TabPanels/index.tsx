import { ReactElement } from 'react';

import { TabPanels as CUITabPanels, TabPanel, Fade } from '@chakra-ui/react';

import { TabPanelsProps } from './types';

const TabPanels = ({ children, activeTab }: TabPanelsProps): ReactElement => {
  return (
    <CUITabPanels>
      {children.map((panel, index) => (
        <TabPanel key={index} as={Fade} in={activeTab === index} p={0} unmountOnExit>
          {panel}
        </TabPanel>
      ))}
    </CUITabPanels>
  );
};

export default TabPanels;
