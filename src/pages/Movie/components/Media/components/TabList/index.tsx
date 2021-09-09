import React, { ReactElement } from 'react';

import { useColorMode, TabList as CUITabList, HStack } from '@chakra-ui/react';

import Tab from './components/Tab';

const tabs = ['photos', 'backdrops', 'videos'];

const TabList = ({ activeIndex }: { activeIndex: number }): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <CUITabList
      as={HStack}
      borderRadius='base'
      backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.800'}
      spacing={0}
      p={0.75}>
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab} isActive={activeIndex === index} />
      ))}
    </CUITabList>
  );
};

export default TabList;
